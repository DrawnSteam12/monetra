import { Request, Response } from "express";
import mongoose from "mongoose";
import Transaction from "../models/Transaction";
import User from "../models/User";

interface AuthRequest extends Request {
  userId?: string;
}

export const getAnalytics = async (
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
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
      });
    }

    const { startDate, endDate } = request.query;

    const filter: any = {
      userId,
    };

    let parsedStartDate: Date | undefined;
    let parsedEndDate: Date | undefined;

    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        parsedStartDate = new Date(startDate as string);

        if (isNaN(parsedStartDate.getTime())) {
          return response.status(400).json({
            message: "Invalid startDate",
          });
        }

        filter.date.$gte = parsedStartDate;
      }

      if (endDate) {
        parsedEndDate = new Date(endDate as string);

        if (isNaN(parsedEndDate.getTime())) {
          return response.status(400).json({
            message: "Invalid endDate",
          });
        }

        filter.date.$lte = parsedEndDate;
      }
    }

    if (parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate) {
      return response.status(400).json({
        message: "startDate cannot be after endDate",
      });
    }
    const transactions = await Transaction.find(filter).sort({
      date: -1,
    });

    const categoryBreakdown = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: "expense",

          ...(filter.date && {
            date: filter.date,
          }),
        },
      },

      {
        $group: {
          _id: "$category",

          total: {
            $sum: "$amount",
          },

          count: {
            $sum: 1,
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

          count: 1,
        },
      },
    ]);

    const monthlyTrend = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),

          ...(filter.date && {
            date: filter.date,
          }),
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

          cashFlow: {
            $subtract: ["$income", "$expenses"],
          },
        },
      },
    ]);

    const highestIncomeMonth =
      monthlyTrend.length > 0
        ? monthlyTrend.reduce((highest, current) =>
            current.income > highest.income ? current : highest,
          )
        : null;

    const highestExpenseMonth =
      monthlyTrend.length > 0
        ? monthlyTrend.reduce((highest, current) =>
            current.expenses > highest.expenses ? current : highest,
          )
        : null;

    const bestSavingMonth =
      monthlyTrend.length > 0
        ? monthlyTrend.reduce((best, current) =>
            current.cashFlow > best.cashFlow ? current : best,
          )
        : null;

    const worstSavingMonth =
      monthlyTrend.length > 0
        ? monthlyTrend.reduce((worst, current) =>
            current.cashFlow < worst.cashFlow ? current : worst,
          )
        : null;
    const additionalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const profileIncome = Number(user.monthlyIncome) || 0;

    const totalIncome = profileIncome + additionalIncome;
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const netSavings = totalIncome - totalExpenses;

    const savingsRate =
      totalIncome > 0
        ? Number(((netSavings / totalIncome) * 100).toFixed(2))
        : 0;

    const expenseRatio =
      totalIncome > 0
        ? Number(((totalExpenses / totalIncome) * 100).toFixed(2))
        : 0;

    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "income",
    );

    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "expense",
    );

    const largestIncome =
      incomeTransactions.length > 0
        ? incomeTransactions.reduce((largest, transaction) =>
            transaction.amount > largest.amount ? transaction : largest,
          )
        : null;

    const largestExpense =
      expenseTransactions.length > 0
        ? expenseTransactions.reduce((largest, transaction) =>
            transaction.amount > largest.amount ? transaction : largest,
          )
        : null;

    const averageIncome =
      incomeTransactions.length > 0
        ? Number((totalIncome / incomeTransactions.length).toFixed(2))
        : 0;

    const averageExpense =
      expenseTransactions.length > 0
        ? Number((totalExpenses / expenseTransactions.length).toFixed(2))
        : 0;

    const incomeCount = incomeTransactions.length;

    const expenseCount = expenseTransactions.length;

    let budgetInsights = null;

    let savingsInsights = null;

    if (totalIncome > 0) {
      let recommendation = "";
      let status: "healthy" | "warning" | "danger" = "healthy";

      if (savingsRate < 10) {
        status = "danger";

        recommendation =
          "Your saving is very low. Try reducing unnecessary expenses.";
      } else if (savingsRate < 20) {
        status = "warning";

        recommendation =
          "You're saving a little, but increasing your monthly savings will improve";
      } else {
        status = "healthy";

        recommendation =
          "Excellent savings habit! Keep maintaining this savings rate.";
      }
      savingsInsights = {
        totalSavings: netSavings,
        savingsRate,
        recommendation,
        status,
      };
    }

    if (categoryBreakdown.length > 0) {
      const topCategory = categoryBreakdown[0];

      const spendingRatio =
        totalIncome > 0
          ? Number(((totalExpenses / totalIncome) * 100).toFixed(2))
          : 100;

      let recommendation = "";
      let status: "healthy" | "warning" | "danger" = "healthy";

      if (spendingRatio > 80) {
        status = "danger";

        recommendation = `Your expenses are consuming ${spendingRatio}% of your income. Reduce spending in ${topCategory.category}.`;
      } else if (spendingRatio > 60) {
        status = "warning";

        recommendation = `You are spending ${spendingRatio}% of your income. Monitor ${topCategory.category} closely.`;
      } else {
        recommendation = `Your finances look balanced. Keep monitoring ${topCategory.category} spending.`;
      }

      budgetInsights = {
        topCategory: topCategory.category,
        topCategoryAmount: topCategory.total,
        topCategoryPercentage:
          totalExpenses > 0
            ? Number(((topCategory.total / totalExpenses) * 100).toFixed(2))
            : 0,
        spendingRatio,
        recommendation,
        status,
      };
    }

    return response.status(200).json({
      summary: {
        totalIncome,
        totalExpenses,
        netSavings,
        averageIncome,
        averageExpense,
        incomeCount,
        expenseCount,
      },

      financialInsights: {
        savingsRate,
        expenseRatio,
      },

      budgetInsights,
      savingsInsights,

      largestIncome,
      largestExpense,

      highestIncomeMonth,
      highestExpenseMonth,

      bestSavingMonth,
      worstSavingMonth,

      monthlyTrend,

      categoryBreakdown,

      transactions,
    });
  } catch (error) {
    console.error("Get Analytics Error:", error);

    response.status(500).json({
      message: "Internal server error",
    });
  }
};
