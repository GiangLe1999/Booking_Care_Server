import db from "../models";
import * as bcrypt from "bcrypt";

const getUserByEmail = async (email) => {
  const user = await db.User.findOne({
    where: { email },
    attributes: ["email", "roleId", "password", "id"],
  });
  return user;
};

const checkPassword = async (aPassword, bPassword) => {
  try {
    return await bcrypt.compare(aPassword, bPassword);
  } catch (error) {
    return { ok: false, error: "Couldn't check password" };
  }
};

export const userLoginHandler = async (email, password) => {
  const existedUser = await getUserByEmail(email);

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
    user: {
      email: existedUser.email,
      roleId: existedUser.roleId,
      id: existedUser.id,
    },
  };
};

export const getAllUsers = async () => {
  try {
    const users = await db.User.findAll();

    return { ok: true, users };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getUserById = async (id, isRaw = true) => {
  try {
    if (!id) {
      return { ok: false, error: "Missing required parameter id" };
    }

    const user = await db.User.findOne({
      where: { id },
      raw: isRaw,
    });

    return { ok: true, user };
  } catch (error) {
    return { ok: false, error: "Couldn't find user" };
  }
};

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    return { ok: false, error: "Couldn't hash password" };
  }
};

export const createUser = async (formData) => {
  try {
    const existedUser = await getUserByEmail(formData.email);

    if (existedUser) {
      return { ok: false, error: "User already exists" };
    }

    const hashedPassword = await hashPassword(formData.password);
    await db.User.create({
      ...formData,
      image: formData.avatar,
      password: hashedPassword,
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: "Could not create user" };
  }
};

export const editUser = async (newUserData) => {
  try {
    if (!newUserData.id) {
      return { ok: false, error: "Missing required parameter id" };
    }

    const { user } = await getUserById(newUserData.id, false);

    if (!user) {
      return { ok: false, error: "Found no user" };
    }

    user.email = newUserData.email;
    user.firstName = newUserData.firstName;
    user.lastName = newUserData.lastName;
    user.address = newUserData.address;
    user.gender = newUserData.gender;
    user.roleId = newUserData.roleId;
    user.phoneNumber = newUserData.phoneNumber;
    user.positionId = newUserData.positionId;
    user.image = newUserData.avatar;

    await user.save();

    return {
      ok: true,
    };
  } catch (error) {
    return { ok: false, error: "Could not edit user" };
  }
};

export const deleteUser = async (userId) => {
  if (!userId) {
    return { ok: false, error: "Missing required parameter id" };
  }

  const { user } = await getUserById(userId, false);

  if (!user) {
    return { ok: false, error: "Found no user" };
  }

  await user.destroy();

  return {
    ok: true,
  };
};
