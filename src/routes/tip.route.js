import express from "express";
import {
  createTipHandler,
  getHomeTipsHandler,
  getTipSlugHandler,
} from "../controllers/tip.controller";

const tipRouter = express.Router();

tipRouter.post("/tip", createTipHandler);
tipRouter.get("/home-tips", getHomeTipsHandler);
tipRouter.get("/tip", getTipSlugHandler);

export default tipRouter;
