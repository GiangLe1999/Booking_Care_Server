import express from "express";
import {
  deleteCRUD,
  displayCRUD,
  getCRUD,
  getEditCRUD,
  getHomePage,
  postCRUD,
  putCRUD,
} from "../controllers/home.controller";

const crudRouter = express.Router();

crudRouter.get("/", getHomePage);
crudRouter.get("/crud", getCRUD);
crudRouter.get("/get-crud", displayCRUD);
crudRouter.post("/post-crud", postCRUD);
crudRouter.get("/edit-crud", getEditCRUD);
crudRouter.post("/put-crud", putCRUD);
crudRouter.get("/delete-crud", deleteCRUD);

export default crudRouter;
