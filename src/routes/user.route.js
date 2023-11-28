import express from "express";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getAllUsersHandler,
  getUserHandler,
  loginHandler,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/login", loginHandler);
userRouter.get(
  "/users",
  isAuthenticated,
  authorizeRoles("R1"),
  getAllUsersHandler
);
userRouter.get(
  "/user/:id",
  isAuthenticated,
  authorizeRoles("R1"),
  getUserHandler
);
userRouter.post(
  "/user",
  isAuthenticated,
  authorizeRoles("R1"),
  createUserHandler
);
userRouter.put(
  "/edit-user",
  isAuthenticated,
  authorizeRoles("R1"),
  editUserHandler
);
userRouter.delete(
  "/user/:id",
  isAuthenticated,
  authorizeRoles("R1"),
  deleteUserHandler
);

export default userRouter;
