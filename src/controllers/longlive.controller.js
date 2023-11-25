import {
  createLonglive,
  getHomeLonglives,
  getLongliveBySlug,
} from "../service/longlive.service";

export const createLongliveHandler = async (req, res) => {
  try {
    res.status(200).json(await createLonglive(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getHomeLonglivesHandler = async (req, res) => {
  try {
    res.status(200).json(await getHomeLonglives());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getLongliveBySlugHandler = async (req, res) => {
  try {
    res.status(200).json(await getLongliveBySlug(req.query));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
