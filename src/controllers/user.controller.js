import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
  userLoginHandler,
} from "../service/user.service";

export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing email or password" });
    }

    const loginInfo = await userLoginHandler(email, password);

    res.status(200).json(loginInfo);
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getAllUsersHandler = async (req, res) => {
  try {
    res.status(200).json(await getAllUsers());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getUserHandler = async (req, res) => {
  try {
    res.status(200).json(await getUserById(req.params.id));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const createUserHandler = async (req, res) => {
  try {
    res.status(201).json(await createUser(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const editUserHandler = async (req, res) => {
  try {
    res.status(200).json(await editUser(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    res.status(200).json(await deleteUser(req.params.id));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
