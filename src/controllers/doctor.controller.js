import {
  getTopDoctors,
  getAllDoctors,
  saveDoctorInfo,
  getDoctorById,
  editDoctorInfo,
  bulkCreateSchedule,
  getScheduleByDate,
  getDoctorsBySpecialty,
  getDoctorsByClinic,
  getPatientsByDoctor,
  sendBill,
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

export const editDoctorInfoHandler = async (req, res) => {
  try {
    res.status(200).json(await editDoctorInfo(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const bulkCreateScheduleHandler = async (req, res) => {
  try {
    res.status(200).json(await bulkCreateSchedule(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getScheduleByDateHandler = async (req, res) => {
  try {
    res.status(200).json(await getScheduleByDate(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getDoctorsBySpecialtyHandler = async (req, res) => {
  try {
    res.status(200).json(await getDoctorsBySpecialty(req.query));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getDoctorsByClinicHandler = async (req, res) => {
  try {
    res.status(200).json(await getDoctorsByClinic(req.query));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const getPatientsByDoctorHandler = async (req, res) => {
  try {
    res.status(200).json(await getPatientsByDoctor(req.query));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

export const sendBillHandler = async (req, res) => {
  try {
    res.status(200).json(await sendBill(req.body));
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};
