import * as jwt from "jsonwebtoken";
import db from "../models";
require("dotenv").config();

export const isAuthenticated = async (req, res, next) => {
  const access_token = req.get("x-jwt");

  if (!access_token) {
    return res.status(401).json({
      ok: false,
      error: "You are not authrozied to access this resource",
    });
  }

  const decoded = jwt.verify(access_token, process.env.TOKEN_SECRET_KEY);

  if (!decoded) {
    return res.status(401).json({
      ok: false,
      error: "You are not authrozied to access this resource",
    });
  }

  const user = await db.User.findOne({ where: { id: Number(decoded.id) } });

  if (!user) {
    return res.status(401).json({
      ok: false,
      error: "You are not authrozied to access this resource",
    });
  }

  req.user = user;
  next();
};

// Validate user role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req?.user?.roleId || "")) {
      return res.status(401).json({
        ok: false,
        error: "You are not authrozied to access this resource",
      });
    }
    next();
  };
};
