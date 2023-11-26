import express from "express";
import {
  createHandbookHandler,
  getHandbookBySlugHandler,
  getHandbookResultsHandler,
  getHomeHandbooksHandler,
} from "../controllers/handbook.controller";

const handbookRouter = express.Router();

handbookRouter.post("/handbook", createHandbookHandler);
handbookRouter.get("/home-handbooks", getHomeHandbooksHandler);
handbookRouter.get("/handbook", getHandbookBySlugHandler);
handbookRouter.get("/handbook-results", getHandbookResultsHandler);

export default handbookRouter;
