import {
  createHandbook,
  getHanbookBySlug,
  getHomeHandbooks,
} from "../service/handbook.service";

export const createHandbookHandler = async (req, res) => {
  try {
    res.status(200).json(await createHandbook(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getHomeHandbooksHandler = async (req, res) => {
  try {
    res.status(200).json(await getHomeHandbooks());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getHandbookBySlugHandler = async (req, res) => {
  try {
    res.status(200).json(await getHanbookBySlug(req.query));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
