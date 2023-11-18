import { User } from "../../orm/model/User/User";
import Logger from "../../core/logger";
import { createTokens } from "../../auth/authUtils";
import { AuthFailureError } from "../../core/apiError";
import axios from "axios";

export const userResolvers = {
  Query: {
    get_all_users,
  },
  Mutation: {
    register,
    google_login,
  },
};
async function google_login(_, { google_id_token }) {
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
        token: token.token, // Include the token in the response
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
      token: token.token, // Include the token in the response
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
      token: token.token, // Include the token in the response
    };
  } catch (error) {
    // Handle any errors that may occur during user creation.
    return null; // You can return an error message or handle the error as needed.
  }
}

//@ts-ignore
async function get_all_users(_, __, context): Promise<any[]> {
  const users = await User.find();
  const formattedUsers = users.map((user) => ({
    ...user,
    created_at: user.created_at.toLocaleDateString("en-GB"), // Adjust 'en-GB' based on your locale
  }));
  return formattedUsers;
}
