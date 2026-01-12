import express from "express";
import {
  getUser,
  login,
  logout,
  refresh,
} from "controllers/authcontroller/AuthController";
import { verifyJwt } from "middlewares/verifyJWT";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", verifyJwt, getUser);

export default router;
