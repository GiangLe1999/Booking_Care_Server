import { createTip, getHomeTips } from "../service/tip.service";

export const createTipHandler = async (req, res) => {
  try {
    res.status(200).json(await createTip(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getHomeTipsHandler = async (req, res) => {
  try {
    res.status(200).json(await getHomeTips());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};