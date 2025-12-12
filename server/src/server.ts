import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { port } from "config/db.config";
import helmet from "helmet";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ! API HERE

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
