import express from "express";
import {
  createHandbookHandler,
  getHomeHandbooksHandler,
} from "../controllers/handbook.controller";

const handbookRouter = express.Router();

handbookRouter.post("/handbook", createHandbookHandler);
handbookRouter.get("/home-handbooks", getHomeHandbooksHandler);

export default handbookRouter;
