import express from "express";

import { registerUser, loginUser } from "../controllers/authController";

import {
  validateRegister,
  validateLogin,
} from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/register", validateRegister, registerUser);

router.post("/login", validateLogin, loginUser);

export default router;
