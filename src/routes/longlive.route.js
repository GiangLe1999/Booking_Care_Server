import express from "express";
import {
  createLongliveHandler,
  getHomeLonglivesHandler,
  getLongliveBySlugHandler,
  getLongliveResultsHandler,
} from "../controllers/longlive.controller";

const longliveRouter = express.Router();

longliveRouter.post("/longlive", createLongliveHandler);
longliveRouter.get("/home-longlives", getHomeLonglivesHandler);
longliveRouter.get("/longlive", getLongliveBySlugHandler);
longliveRouter.get("/longlive-results", getLongliveResultsHandler);

export default longliveRouter;
