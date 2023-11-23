import {
  createClinic,
  getAllClinics,
  getClinicById,
} from "../service/clinic.service";

export const getAllClinicsHandler = async (req, res) => {
  try {
    res.status(200).json(await getAllClinics());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const createClinicHandler = async (req, res) => {
  try {
    res.status(200).json(await createClinic(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getClinicByIdHandler = async (req, res) => {
  try {
    res.status(200).json(await getClinicById(req.query.id));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
