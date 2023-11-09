import express from "express";
import cors from "cors";
import { connectDB } from "./config/connect-db";
import userRouter from "./routes/user.route";
import allCodesRouter from "./routes/allcodes.route";
import doctorRouter from "./routes/doctor.route";
import patientRouter from "./routes/patient.route";
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [process.env.REACT_APP_FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", userRouter, allCodesRouter, doctorRouter, patientRouter);

connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
