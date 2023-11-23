import express from "express";
import {
  createSpecialtyHandler,
  getAllSpecialtiesHandler,
  getHomeSpecialtiesHandler,
  getSpecialtyByIdHandler,
} from "../controllers/specialty.controller";

const specialtyRouter = express.Router();

specialtyRouter.get("/specialties", getAllSpecialtiesHandler);
specialtyRouter.get("/home-specialties", getHomeSpecialtiesHandler);
specialtyRouter.post("/specialty", createSpecialtyHandler);
specialtyRouter.get("/specialty", getSpecialtyByIdHandler);

export default specialtyRouter;
