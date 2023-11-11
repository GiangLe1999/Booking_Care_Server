import express from "express";
import {
  bookScheduleHandler,
  bookingVerifyHandler,
} from "../controllers/patient.controller";

const patientRouter = express.Router();

patientRouter.post("/book-schedule", bookScheduleHandler);
patientRouter.put("/booking-verify", bookingVerifyHandler);

export default patientRouter;
