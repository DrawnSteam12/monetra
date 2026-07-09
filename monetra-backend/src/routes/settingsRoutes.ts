import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import { getSettings, updateSettings } from "../controllers/settingsController";

const router = express.Router();

router.get("/", authMiddleware, getSettings);

router.put("/", authMiddleware, updateSettings);

export default router;
