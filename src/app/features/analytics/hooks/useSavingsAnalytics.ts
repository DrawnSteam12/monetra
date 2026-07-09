import type { Transaction } from "../../../types/transaction.types";
type SavingsAnalytics = {
  totalIncome: number;

  totalExpenses: number;

  totalSavings: number;

  savingsRate: number;

  recommendation: string;

  status: "healthy" | "warning" | "danger";
};

export const useSavingsAnalytics = (
  transactions: Transaction[],
): SavingsAnalytics | null => {
  const income = transactions.filter(
    (transaction) => transaction.type === "income",
  );

  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  if (income.length === 0) {
    return null;
  }

  const totalIncome = income.reduce(
    (total, transaction) => total + transaction.amount,

    0,
  );

  const totalExpenses = expenses.reduce(
    (total, transactions) => total + transactions.amount,

    0,
  );

  const totalSavings = totalIncome - totalExpenses;

  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  let recommendation = "";

  let status: "healthy" | "warning" | "danger" = "healthy";

  if (savingsRate > 20) {
    status = "healthy";

    recommendation =
      "Excellent saving habits. You are saving more than 20% of your income.";
  } else if (savingsRate >= 10) {
    status = "warning";

    recommendation =
      " Your saving are decent, but try increasing them for better financial stability.";
  } else {
    status = "danger";

    recommendation =
      "Your savings rate is low. Consider reducing unnecessary expenses.";
  }

  return {
    totalIncome,

    totalExpenses,

    totalSavings,
    savingsRate,
    recommendation,
    status,
  };
};
