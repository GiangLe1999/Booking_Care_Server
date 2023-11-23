import {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
} from "../service/specialty.service";

export const getAllSpecialtiesHandler = async (req, res) => {
  try {
    res.status(200).json(await getAllSpecialties());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const createSpecialtyHandler = async (req, res) => {
  try {
    res.status(200).json(await createSpecialty(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getSpecialtyByIdHandler = async (req, res) => {
  try {
    res.status(200).json(await getSpecialtyById(req.query.id));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
