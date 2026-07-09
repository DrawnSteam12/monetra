import express from "express";

import authMiddleware from "../middleware/authMiddleware";

import { validateTransaction } from "../middleware/validationMiddleware";

import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);

router.post(
  "/",

  authMiddleware,

  validateTransaction,

  createTransaction,
);

router.put(
  "/:id",
  authMiddleware,

  validateTransaction,

  updateTransaction,
);

router.delete("/:id", authMiddleware, deleteTransaction);

export default router;
