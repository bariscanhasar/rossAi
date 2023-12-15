import { User } from "../../orm/model/User/User";
import Logger from "../../core/logger";
import { createTokens } from "../../auth/authUtils";
import axios from "axios";
import { ReplicateModel } from "../../orm/model/Replicate/ReplicateModel";
import { Set } from "../../orm/model/Set/Set";
import crypto from "crypto-js";
import bcrypt from "bcrypt";
import { checkPermission } from "../../helpers/checkPermission";

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
    anonRegister,
  },
};
async function googleLogin(_, { google_id_token,fcmId }) {
  const google_token = google_id_token;

  try {
    const response = await axios.get(process.env.GOOGLE_AUTH + google_token);
    const data = response.data;
    const user_exist = await User.findOne({ where: { subId: data.sub } });

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
    user.subId = data.sub;
    user.email = data.email;
    user.firstName = data.given_name;
    user.lastName = data.family_name;
    const newUser = await user.save();
    const token = await createTokens(newUser);

    return token.token;
  } catch (e) {
    console.log(e);
  }
}

async function register(
  _,
  {
    firstName,
    lastName,
    email,
    role,
    deviceType,
    keychain,
    isAgreementCheck,
    isPremium,
    subId,
    fcmId,
    password,
  }
) {
  try {
    const userExist = await User.findOne({
      where: { email: email },
    });

    if (userExist) return new Error("User already exists.");

    const hashedPass = password ? await bcrypt.hash(password, 10) : undefined;

    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.role = role || "USER";
    user.deviceType = deviceType;
    user.keychain = keychain;
    user.isAgreementCheck = isAgreementCheck;
    user.isPremium = isPremium;
    user.subId = subId;
    user.fcmId = fcmId;
    user.password = hashedPass;

    const newUser = await user.save();

    const token = await createTokens(newUser);

    return {
      user:user,
      token: token.token,
    };
  } catch (e) {
    console.error("Registration error:", e);
    throw new Error("Registiration error.");
  }
}

async function anonRegister(_, { deviceType, keychain, fcmId }) {
  const user = new User();
  user.deviceType = deviceType;
  user.keychain = keychain;
  const saved_user = await user.save();

  saved_user.email = `user_${saved_user.id}@rossai.com`;
  const last_user = await saved_user.save();

  const token = await createTokens(last_user);

  return {
    token: token.token,
  };
}

async function login(_, { email, password }) {
  const exist_user = await User.findOne({ where: { email: email } });
  if (password) {
    const hashedPass = crypto.AES.decrypt(exist_user!.password!, "secret_key");
    const orgPass = hashedPass.toString(crypto.enc.Utf8);

    if (orgPass !== password) throw new Error("Wrong pass.");
  }

  const token = await createTokens(exist_user);

  return {
    token: token.token,
  };
}

//@ts-ignore
async function getAllUsers(_, __, context): Promise<any[]> {
  checkPermission(context.user.role);
  const users = await User.find();
  const formattedUsers = users.map((user) => ({
    ...user,
    created_at: user.createdAt.toLocaleDateString("en-GB"),
  }));

  return formattedUsers;
}

async function getUser(_, { userId }, context) {
  const user = await User.findOne({ where: { id: userId } });


  if (!user) return Error("No user.");

  return user;
}

async function deleteUser(_, { userId }, context) {
  const user = await User.findOne({ where: { id: userId } });

  await user?.remove();

  return user;
}

async function mergeUser({ _, userId, newUserId }) {
  try {
    const exit_user = await User.findOne({ where: { id: userId } });
    const user_models = await ReplicateModel.find({
      where: { user: { id: exit_user!.id } },
    });
    const user_sets = await Set.find({
      where: { user: { id: exit_user!.id } },
    });
    user_models.map(async (model) => {
      model.user.id = newUserId;
      await model.save();
    });
    user_sets.map(async (set) => {
      set.user.id = newUserId;
      await set.save();
    });

    await exit_user?.remove();
  } catch (e) {
    return e;
  }
}


async function addFcmId(_,{fcmId}) {

}
