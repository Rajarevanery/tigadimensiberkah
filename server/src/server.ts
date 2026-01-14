import { env } from "config/env";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRouter from "./routes/auth/auth";
import wilayahRouter from "./routes/root/wilayah";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.client_url,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ! API HERE
app.use("/api/auth", authRouter);
app.use("/api/wilayah", wilayahRouter);

app.listen(env.port, () => {
  console.log(`Server is running on ${env.port}`);
});
