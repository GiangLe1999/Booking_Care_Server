import express from "express";
import {
  createHandbookHandler,
  getHandbookBySlugHandler,
  getHomeHandbooksHandler,
} from "../controllers/handbook.controller";

const handbookRouter = express.Router();

handbookRouter.post("/handbook", createHandbookHandler);
handbookRouter.get("/home-handbooks", getHomeHandbooksHandler);
handbookRouter.get("/handbook", getHandbookBySlugHandler);

export default handbookRouter;
