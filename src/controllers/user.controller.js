import { userLoginHandler } from "../services/user.service";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing email or password" });
    }

    const userData = await userLoginHandler(email, password);

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
