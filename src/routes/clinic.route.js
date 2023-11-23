import express from "express";
import {
  createClinicHandler,
  getAllClinicsHandler,
  getClinicByIdHandler,
} from "../controllers/clinic.controller";

const clinicRouter = express.Router();

clinicRouter.get("/clinics", getAllClinicsHandler);
clinicRouter.post("/clinic", createClinicHandler);
clinicRouter.get("/clinic", getClinicByIdHandler);

export default clinicRouter;
