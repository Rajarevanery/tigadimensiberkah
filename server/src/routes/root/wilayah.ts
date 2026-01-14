import express from "express";
import { verifyJwt } from "middlewares/verifyJWT";
import { getAllWilayah } from "controllers/rootcontroller/WilayahController";

const router = express.Router();

router.get("/", verifyJwt, getAllWilayah);

export default router;
