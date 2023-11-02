import express from "express";
import {
  getAllDoctorsHandler,
  getDoctorByIdHandler,
  getTopDoctorsHandler,
  saveDoctorInfoHandler,
} from "../controllers/doctor.controller";

const doctorRouter = express.Router();

doctorRouter.get("/top-doctors", getTopDoctorsHandler);
doctorRouter.get("/doctors", getAllDoctorsHandler);
doctorRouter.post("/doctor-info", saveDoctorInfoHandler);
doctorRouter.get("/doctor", getDoctorByIdHandler);

export default doctorRouter;
