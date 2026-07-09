
import type { Transaction } from "../../../types/transaction.types";

type BudgetInsights = {
  topCategory: string;

  topCategoryAmount: number;

  topCategoryPercentage: number;

  totalExpenses: number;

  totalIncome: number;

  spendingRatio: number;

  recommendation: string;

  status: "healthy" | "warning" | "danger";
};

export const useBudgetInsights = (
  transactions: Transaction[],
): BudgetInsights | null => {
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const income = transactions.filter(
    (transaction) => transaction.type === "income",
  );

  if (expenses.length === 0) {
    return null;
  }

  const totalIncome = income.reduce(
    (total, transaction) => total + transaction.amount,

    0,
  );

  const totalExpenses = expenses.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const categoryTotals: Record<string, number> = {};

  expenses.forEach((transaction) => {
    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = 0;
    }

    categoryTotals[transaction.category] += transaction.amount;
  });

  const topCategoryEntry = Object.entries(categoryTotals).sort(
    (
      [, amountA],

      [, amountB],
    ) => amountB - amountA,
  )[0];

  const [topCategory, topCategoryAmount] = topCategoryEntry;

  const topCategoryPercentage =
    totalIncome > 0 ? (topCategoryAmount / totalIncome) * 100 : 0;

  const spendingRatio =
    totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 100;

  let recommendation = "";

  let status: "healthy" | "warning" | "danger" = "healthy";

  if (spendingRatio > 80) {
    status = "danger";

    recommendation = `Your expenses are consuming ${spendingRatio.toFixed(1)} % of your income. Reduce spending in ${topCategory}.`;
  } else if (spendingRatio > 60) {
    status = "warning";

    recommendation = ` You are spending ${spendingRatio.toFixed(
      1,
    )} % of your income. Monitor ${topCategory} closely.`;
  } else {
    status = "healthy";

    recommendation = ` Your finances look balanced. Keep monitoring ${topCategory} spending.`;
  }

  return {
    topCategory,

    topCategoryAmount,

    topCategoryPercentage,

    totalExpenses,

    totalIncome,

    spendingRatio,

    recommendation,

    status,
  };
};
