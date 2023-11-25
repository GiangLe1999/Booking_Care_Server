import express from "express";
import {
  createLongliveHandler,
  getHomeLonglivesHandler,
} from "../controllers/longlive.controller";

const longliveRouter = express.Router();

longliveRouter.post("/longlive", createLongliveHandler);
longliveRouter.get("/home-longlives", getHomeLonglivesHandler);

export default longliveRouter;
