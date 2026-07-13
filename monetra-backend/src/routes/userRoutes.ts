import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount,
} from "../controllers/userController";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

router.put("/profile", authMiddleware, updateUserProfile);

router.put("/change-password", authMiddleware, changePassword);

router.delete("/", authMiddleware, deleteAccount);
export default router;
