import { Request, Response } from "express";
import mongoose from "mongoose";
import Transaction from "../models/Transaction";
import User from "../models/User";

interface AuthRequest extends Request {
  userId?: string;
}

export const getDashboard = async (
  request: AuthRequest,
  response: Response,
) => {
  try {
    const userId = request.userId;

    if (!userId) {
      return response.status(404).json({
        message: "Unauthorized",
      });
    }
    const user = await User.findById(userId);

    if (!user) {
      return response.status(401).json({
        message: "User not found",
      });
    }

    const transactions = await Transaction.find({
      userId,
    }).sort({ date: -1 });

    const additionalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalIncome = user.monthlyIncome + additionalIncome;

    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const currentBalance = totalIncome - totalExpenses;

    const recentTransactions = transactions.slice(0, 5);

    const categoryBreakdown = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",

          total: {
            $sum: "$amount",
          },
        },
      },

      {
        $sort: {
          total: -1,
        },
      },

      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1,
        },
      },
    ]);

    const monthlySummary = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },

      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },

          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },

          expenses: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },

      {
        $project: {
          _id: 0,

          year: "$_id.year",

          month: "$_id.month",

          income: 1,

          expenses: 1,
        },
      },
    ]);

    return response.status(200).json({
      summary: {
        totalIncome,
        totalExpenses,
        currentBalance,
      },
      recentTransactions,
      categoryBreakdown,
      monthlySummary,
    });
  } catch (error) {
    console.error("Get Dashboard Data Error:", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
};
