import { getAllCodes, getCodesByType } from "../service/allcodes.service";

export const getAllCodesHandler = async (req, res) => {
  try {
    return res.status(200).json(await getAllCodes());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getCodesHandler = async (req, res) => {
  try {
    return res.status(200).json(await getCodesByType(req.query.type));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
