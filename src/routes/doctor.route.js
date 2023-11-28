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
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const doctorRouter = express.Router();

doctorRouter.get("/top-doctors", getTopDoctorsHandler);
doctorRouter.get("/doctors", getAllDoctorsHandler);
doctorRouter.post(
  "/doctor-info",
  isAuthenticated,
  authorizeRoles("R1"),
  saveDoctorInfoHandler
);
doctorRouter.put(
  "/doctor-info",
  isAuthenticated,
  authorizeRoles("R1"),
  editDoctorInfoHandler
);
doctorRouter.get("/doctor", getDoctorByIdHandler);
doctorRouter.post(
  "/schedule",
  isAuthenticated,
  authorizeRoles("R2"),
  bulkCreateScheduleHandler
);
doctorRouter.post("/get-schedule-by-date", getScheduleByDateHandler);
doctorRouter.get("/get-doctors-by-specialty", getDoctorsBySpecialtyHandler);
doctorRouter.get("/get-doctors-by-clinic", getDoctorsByClinicHandler);
doctorRouter.get(
  "/get-patients-by-doctor",
  isAuthenticated,
  authorizeRoles("R2"),
  getPatientsByDoctorHandler
);
doctorRouter.post(
  "/send-bill",
  isAuthenticated,
  authorizeRoles("R2"),
  sendBillHandler
);

export default doctorRouter;
