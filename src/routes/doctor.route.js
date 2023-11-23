import express from "express";
import {
  bulkCreateScheduleHandler,
  editDoctorInfoHandler,
  getAllDoctorsHandler,
  getDoctorByIdHandler,
  getTopDoctorsHandler,
  saveDoctorInfoHandler,
  getScheduleByDateHandler,
  getDoctorsBySpecialtyHandler,
  getDoctorsByClinicHandler,
  getPatientsByDoctorHandler,
  sendBillHandler,
} from "../controllers/doctor.controller";

const doctorRouter = express.Router();

doctorRouter.get("/top-doctors", getTopDoctorsHandler);
doctorRouter.get("/doctors", getAllDoctorsHandler);
doctorRouter.post("/doctor-info", saveDoctorInfoHandler);
doctorRouter.put("/doctor-info", editDoctorInfoHandler);
doctorRouter.get("/doctor", getDoctorByIdHandler);
doctorRouter.post("/schedule", bulkCreateScheduleHandler);
doctorRouter.post("/get-schedule-by-date", getScheduleByDateHandler);
doctorRouter.get("/get-doctors-by-specialty", getDoctorsBySpecialtyHandler);
doctorRouter.get("/get-doctors-by-clinic", getDoctorsByClinicHandler);
doctorRouter.get("/get-patients-by-doctor", getPatientsByDoctorHandler);
doctorRouter.post("/send-bill", sendBillHandler);

export default doctorRouter;
