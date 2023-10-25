import express from "express";
import {
  getAllUsersHandler,
  getUserHandler,
  loginHandler,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", loginHandler);
userRouter.get("/users", getAllUsersHandler);
userRouter.get("/user/:id", getUserHandler);

export default userRouter;
