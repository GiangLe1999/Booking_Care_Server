import express from "express";
import {
  createLongliveHandler,
  getHomeLonglivesHandler,
  getLongliveBySlugHandler,
} from "../controllers/longlive.controller";

const longliveRouter = express.Router();

longliveRouter.post("/longlive", createLongliveHandler);
longliveRouter.get("/home-longlives", getHomeLonglivesHandler);
longliveRouter.get("/longlive", getLongliveBySlugHandler);

export default longliveRouter;
