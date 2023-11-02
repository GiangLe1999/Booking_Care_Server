import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getAllUsersHandler,
  getUserHandler,
  loginHandler,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", loginHandler);
userRouter.get("/users", getAllUsersHandler);
userRouter.get("/user/:id", getUserHandler);
userRouter.post("/user", createUserHandler);
userRouter.put("/edit-user", editUserHandler);
userRouter.delete("/user/:id", deleteUserHandler);

export default userRouter;
