import express from "express";
import { getUser, login } from "controllers/authcontroller/AuthController";
import { verifyJwt } from "middlewares/verifyJWT";

const router = express.Router();

router.post("/login", login);
router.get("/me", verifyJwt, getUser)

export default router;
