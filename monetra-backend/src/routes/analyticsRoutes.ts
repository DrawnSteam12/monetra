import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import { getAnalytics } from "../controllers/analyticsController";

const router = express.Router();

router.get("/", authMiddleware, getAnalytics);

export default router;
