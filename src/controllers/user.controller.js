import {
  getAllUsers,
  getUserById,
  userLoginHandler,
} from "../services/user.service";

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
