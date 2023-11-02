import {
  getTopDoctors,
  getAllDoctors,
  saveDoctorInfo,
  getDoctorById,
} from "../service/doctor.service";

export const getTopDoctorsHandler = async (req, res) => {
  try {
    res.status(200).json(await getTopDoctors(req.query.limit));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getAllDoctorsHandler = async (req, res) => {
  try {
    res.status(200).json(await getAllDoctors());
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const saveDoctorInfoHandler = async (req, res) => {
  try {
    res.status(200).json(await saveDoctorInfo(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getDoctorByIdHandler = async (req, res) => {
  try {
    res.status(200).json(await getDoctorById(req.query.id));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
