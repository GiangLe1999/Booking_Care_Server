import express from "express";

const patientRouter = express.Router();

patientRouter.post("/schedule");

export default patientRouter;
