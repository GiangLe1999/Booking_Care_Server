import db from "../models";
import * as bcrypt from "bcrypt";

const findUserByEmail = async (email) => {
  const user = await db.User.findOne({
    where: { email },
    attributes: ["email", "roleId", "password"],
  });
  return user;
};

const checkPassword = async (aPassword, bPassword) => {
  try {
    return await bcrypt.compare(aPassword, bPassword);
  } catch (error) {
    console.log(error);
  }
};

export const userLoginHandler = async (email, password) => {
  const existedUser = await findUserByEmail(email);

  if (!existedUser) return { ok: false, error: "User does not exist" };

  const passwordCorrect = await checkPassword(password, existedUser.password);
  if (!passwordCorrect) {
    return {
      ok: false,
      error: "Wrong password",
    };
  }

  return {
    ok: true,
    user: { email: existedUser.email, roleId: existedUser.roleId },
  };
};
