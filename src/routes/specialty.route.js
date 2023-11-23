import express from "express";
import {
  createSpecialtyHandler,
  getAllSpecialtiesHandler,
  getSpecialtyByIdHandler,
} from "../controllers/specialty.controller";

const specialtyRouter = express.Router();

specialtyRouter.get("/specialties", getAllSpecialtiesHandler);
specialtyRouter.post("/specialty", createSpecialtyHandler);
specialtyRouter.get("/specialty", getSpecialtyByIdHandler);

export default specialtyRouter;
