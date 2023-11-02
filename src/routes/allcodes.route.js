import express from "express";
import {
  getAllCodesHandler,
  getCodesHandler,
} from "../controllers/allcodes.controller";

const allCodesRouter = express.Router();

allCodesRouter.get("/allcodes", getAllCodesHandler);
allCodesRouter.get("/codes", getCodesHandler);

export default allCodesRouter;
