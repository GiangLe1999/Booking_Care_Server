import express from "express";
import {
  bulkCreateScheduleHandler,
  editDoctorInfoHandler,
  getAllDoctorsHandler,
  getDoctorByIdHandler,
  getTopDoctorsHandler,
  saveDoctorInfoHandler,
  getScheduleByDateHandler,
} from "../controllers/doctor.controller";

const doctorRouter = express.Router();

doctorRouter.get("/top-doctors", getTopDoctorsHandler);
doctorRouter.get("/doctors", getAllDoctorsHandler);
doctorRouter.post("/doctor-info", saveDoctorInfoHandler);
doctorRouter.put("/doctor-info", editDoctorInfoHandler);
doctorRouter.get("/doctor", getDoctorByIdHandler);
doctorRouter.post("/schedule", bulkCreateScheduleHandler);
doctorRouter.post("/get-schedule-by-date", getScheduleByDateHandler);

export default doctorRouter;
