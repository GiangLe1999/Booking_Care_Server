import db from "../models";
import * as bcrypt from "bcrypt";

const findUserConfiguration = {
  attributes: { exclude: ["password"] },
};

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

export const getAllUsers = async () => {
  try {
    const users = await db.User.findAll(findUserConfiguration);
    return { ok: true, users };
  } catch (error) {
    return { ok: false, error };
  }
};

export const getUserById = async (id) => {
  try {
    if (!id) {
      return { ok: false, error: "Missing required parameter id" };
    }

    const user = await db.User.findOne({
      where: { id },
      ...findUserConfiguration,
    });

    return { ok: true, user };
  } catch (error) {}
};
