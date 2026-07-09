import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import { getDashboard } from "../controllers/dashboardController";

const router = express.Router();

router.get("/", authMiddleware, getDashboard);

export default router;
