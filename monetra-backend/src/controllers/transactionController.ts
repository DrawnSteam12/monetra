import { Request, Response } from "express";

import mongoose from "mongoose";

import Transaction from "../models/Transaction";

interface AuthRequest extends Request {
  userId?: string;
}

export const createTransaction = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const { title, amount, category, type, date, note } = request.body;

    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }

    const transaction = await Transaction.create({
      userId,
      title,
      amount,
      category,
      type,
      date,
      note,
    });

    response.status(201).json({
      message: "Transaction created successfully",

      transaction: {
        id: transaction._id,

        title: transaction.title,

        amount: transaction.amount,

        category: transaction.category,

        type: transaction.type,

        date: transaction.date,

        note: transaction.note,
      },
    });
  } catch (error) {
    console.error("Create Transaction Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTransactions = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(401).json({
        message: "Unauthorized",
      });
    }

    const transactions = await Transaction.find({
      userId,
    }).sort({
      date: -1,
      createdAt: -1,
    });

    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction._id,

      title: transaction.title,

      amount: transaction.amount,

      category: transaction.category,

      type: transaction.type,

      date: transaction.date,

      note: transaction.note,
    }));

    response.status(200).json({
      transactions: formattedTransactions,
    });
  } catch (error) {
    console.error("Get Transactions Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateTransaction = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const transactionId = request.params.id as string;

    const userId = request.userId;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return response.status(400).json({
        message: "Invalid transaction id",
      });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return response.status(404).json({
        message: "Transaction not found",
      });
    }

    if (transaction.userId.toString() !== userId) {
      return response.status(403).json({
        message: "Access denied",
      });
    }

    const { title, amount, category, type, date, note } = request.body;

    transaction.title = title;
    transaction.amount = amount;
    transaction.category = category;
    transaction.type = type;
    transaction.date = date;
    transaction.note = note;

    await transaction.save();

    response.status(200).json({
      message: "Transaction updated successfully",

      transaction: {
        id: transaction._id,

        title: transaction.title,

        amount: transaction.amount,

        category: transaction.category,

        type: transaction.type,

        date: transaction.date,

        note: transaction.note,
      },
    });
  } catch (error) {
    console.error("Update Transaction Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteTransaction = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const transactionId = request.params.id;

    const userId = request.userId;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return response.status(404).json({
        message: "Transaction not found",
      });
    }

    if (transaction.userId.toString() !== userId) {
      return response.status(403).json({
        message: "Access denied",
      });
    }

    await transaction.deleteOne();

    response.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Delete Transaction Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};
