import express from "express";
import { getUser, login, refresh } from "controllers/authcontroller/AuthController";
import { verifyJwt } from "middlewares/verifyJWT";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh)
router.get("/me", verifyJwt, getUser)

export default router;
