import express from "express";
import {
  getAllUser,
  getUser,
  login,
  logout,
  refresh,
} from "controllers/authcontroller/AuthController";
import { verifyJwt } from "middlewares/verifyJWT";
import { verifyRole } from "middlewares/verifyRole";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", verifyJwt, getUser);
router.get("/user/all", verifyJwt, verifyRole([Role.ADMIN]), getAllUser);

export default router;
