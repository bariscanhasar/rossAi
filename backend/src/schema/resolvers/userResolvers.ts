import { User } from "../../orm/model/User/User";
import Logger from "../../core/logger";
import { createTokens } from "../../auth/authUtils";
import { AuthFailureError } from "../../core/apiError";
import axios from "axios";
import {ReplicateModel} from "../../orm/model/Replicate/ReplicateModel";
import {Set} from "../../orm/model/Set/Set";

export const userResolvers = {
  Query: {
    getAllUsers,
    getUser,
  },
  Mutation: {
    register,
    googleLogin,
    login,
    deleteUser,
    anonRegister
  },
};
async function googleLogin(_, { google_id_token }) {
  console.log(google_id_token);
  const google_token = google_id_token;

  try {
    const response = await axios.get(process.env.GOOGLE_AUTH + google_token);
    const data = response.data;
    const user_exist = await User.findOne({ where: { sub_id: data.sub } });

    if (user_exist) {
      const token = await createTokens(user_exist);
      return {
        code: 1000,
        success: true,
        message: "Google login..",
        is_new_user: false,
        user: user_exist,
        token: token.token,
      };
    }

    const user = new User();
    user.sub_id = data.sub;
    user.email = data.email;
    user.first_name = data.given_name;
    user.last_name = data.family_name;
    const newUser = await user.save();
    const token = await createTokens(newUser);
    return {
      code: 1000,
      success: true,
      message: "User created.",
      is_new_user: true,
      user: newUser,
      token: token.token,
    };
  } catch (e) {
    console.log(e);
  }
}

async function register(
  _,
  {
    first_name,
    last_name,
    email,
    role,
    device_type,
    keychain,
    is_agreement_checked,
    is_premium,
    sub_id,
  }
) {
  const userExist = await User.findOne({
    where: { email: email },
  });

  if (userExist) {
    return new AuthFailureError("User already exists.");
  }

  const user = new User();
  user.email = email;
  user.first_name = first_name;
  user.last_name = last_name;
  user.role = role;
  user.device_type = device_type;
  user.keychain = keychain;
  user.is_agreement_checked = is_agreement_checked;
  user.is_premium = is_premium;
  user.sub_id = sub_id;

  try {
    const newUser = await user.save();
    const token = await createTokens(newUser);
    return {
      code: 1000,
      success: true,
      message: "User created.",
      is_new_user: true,
      user: newUser,
      token: token.token,
    };
  } catch (error) {
    return error;
  }
}

async function anonRegister(
  _,
  { device_token, device_type, keychain, fcm_id }
) {
  const user = new User();
  user.device_type = device_type;
  user.keychain = keychain;
  const saved_user = await user.save();

  saved_user.email = `user_${saved_user.id}@rossai.com`;
  const last_user = await saved_user.save();

  const token = await createTokens(last_user);

  return {
    code: 1000,
    success: true,
    message: "User created.",
    is_new_user: true,
    user: last_user,
    token: token.token,
  };
}

async function login(_, { email }) {
  const exist_user = await User.findOne({ where: { email: email } });
  const token = await createTokens(exist_user);
  return {
    code: 1000,
    success: true,
    message: "logged in.",
    is_new_user: true,
    user: exist_user,
    token: token.token,
  };
}

//@ts-ignore
async function getAllUsers(_, __, context): Promise<any[]> {
  const users = await User.find();
  const formattedUsers = users.map((user) => ({
    ...user,
    created_at: user.created_at.toLocaleDateString("en-GB"),
  }));
  return formattedUsers;
}

async function getUser(_, { user_id }, context) {
  const user = await User.findOne({ where: { id: user_id } });

  if (!user) return Error("No user.");

  return user;
}

async function deleteUser(_, { user_id }, context) {
  const user = await User.findOne({ where: { id: user_id } });

  await user?.remove();

  return user;
}


async function mergeUser({ _, user_id, new_user_id }) {
  try {
    const exit_user = await User.findOne({ where: { id: user_id } });
    const user_models = await ReplicateModel.find({
      where: { user: { id: exit_user!.id } },
    });
    const user_sets = await Set.find({
      where: { user: { id: exit_user!.id } },
    });
    user_models.map(async (model) => {
      model.user.id = new_user_id;
      await model.save();
    });
    user_sets.map(async (set) => {
      set.user.id = new_user_id;
      await set.save();
    });

    await exit_user?.remove();
  } catch (e) {
    return e;
  }
}