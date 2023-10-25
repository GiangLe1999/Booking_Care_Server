import db from "../models";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUserData,
} from "../services/crud.service";

export const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("home-page.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

export const getCRUD = async (req, res) => {
  try {
    return res.render("crud-page.ejs");
  } catch (error) {}
};

export const postCRUD = async (req, res) => {
  try {
    const { error } = await createUser(req.body);
    if (error) {
      throw new Error(error);
    }

    res.redirect("/get-crud");
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const displayCRUD = async (req, res) => {
  try {
    const users = await getAllUser();

    res.render("display-crud.ejs", { tableData: users });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const getEditCRUD = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ ok: false, error: "Found no user id" });
    }

    const userData = await getUserById(userId);

    if (!userData) {
      return res.status(404).json({ ok: false, error: "User not found" });
    }

    return res.render("edit-crud.ejs", { userData });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const putCRUD = async (req, res) => {
  try {
    await updateUserData(req.body);
    res.redirect("/get-crud");
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

export const deleteCRUD = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ error: "Found no user id" });
    }

    await deleteUser(userId);
    res.redirect("/get-crud");
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};
