import bcrypt from "bcrypt";
import db from "../models";

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error("Couldn't hash password");
  }
};

export const createUser = async (formData) => {
  try {
    const hashedPassword = await hashPassword(formData.password);
    await db.User.create({
      ...formData,
      password: hashedPassword,
      gender: formData.gender === "1" ? true : false,
      roleId: formData.role,
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: error.message };
  }
};

export const getAllUser = async () => {
  return await db.User.findAll({ raw: true });
};

export const getUserById = async (userId) => {
  return await db.User.findOne({ where: { id: Number(userId) } });
};

export const updateUserData = async (newUserData) => {
  const user = await getUserById(newUserData.userId);

  if (!user) {
    throw new Error("Found no user");
  }

  user.firstName = newUserData.firstName;
  user.lastName = newUserData.lastName;
  user.address = newUserData.address;

  await user.save();
};

export const deleteUser = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new Error("Found no user");
  }

  await user.destroy();
};
