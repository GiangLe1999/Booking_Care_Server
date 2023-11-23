import express from "express";
import {
  createClinicHandler,
  getAllClinicsHandler,
  getClinicByIdHandler,
  getHomeClinicsHandler,
} from "../controllers/clinic.controller";

const clinicRouter = express.Router();

clinicRouter.get("/clinics", getAllClinicsHandler);
clinicRouter.get("/home-clinics", getHomeClinicsHandler);
clinicRouter.post("/clinic", createClinicHandler);
clinicRouter.get("/clinic", getClinicByIdHandler);

export default clinicRouter;
