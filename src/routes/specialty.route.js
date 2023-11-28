import express from "express";
import {
  createSpecialtyHandler,
  getAllSpecialtiesHandler,
  getHomeSpecialtiesHandler,
  getSearchResultsHandler,
  getSpecialtyByIdHandler,
} from "../controllers/specialty.controller";

const specialtyRouter = express.Router();

specialtyRouter.get("/specialties", getAllSpecialtiesHandler);
specialtyRouter.get("/home-specialties", getHomeSpecialtiesHandler);
specialtyRouter.post("/specialty", createSpecialtyHandler);
specialtyRouter.get("/specialty", getSpecialtyByIdHandler);
specialtyRouter.get("/search", getSearchResultsHandler);

export default specialtyRouter;
