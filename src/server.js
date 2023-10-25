import express from "express";
import viewEngine from "./config/view-engine";
import cors from "cors";
import { connectDB } from "./config/connect-db";
import crudRouter from "./routes/crud.route";
import userRouter from "./routes/user.route";
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

viewEngine(app);

app.use("/api", userRouter);
app.use("/", crudRouter);

connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
