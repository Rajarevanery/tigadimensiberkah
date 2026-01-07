import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { port } from "config/db.config";
import helmet from "helmet";

import authRouter from "./routes/auth/auth";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ! API HERE
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
