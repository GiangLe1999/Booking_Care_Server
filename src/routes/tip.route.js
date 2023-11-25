import express from "express";
import {
  createTipHandler,
  getHomeTipsHandler,
} from "../controllers/tip.controller";

const tipRouter = express.Router();

tipRouter.post("/tip", createTipHandler);
tipRouter.get("/home-tips", getHomeTipsHandler);

export default tipRouter;
