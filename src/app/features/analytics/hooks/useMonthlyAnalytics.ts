import type { Transaction } from "../../../types/transaction.types"

import type { MonthlyAnalytics } from "../types/analytics.type";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const useMonthlyAnalytics = (
  transactions: Transaction[],
): MonthlyAnalytics[] => {
  const monthlyData: MonthlyAnalytics[] = MONTHS.map((month) => ({
    month,

    income: 0,

    expense: 0,
  }));

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    const monthIndex = transactionDate.getMonth();

    if (transaction.type === "income") {
      monthlyData[monthIndex].income += transaction.amount;
    }

    if (transaction.type === "expense") {
      monthlyData[monthIndex].expense += transaction.amount;
    }
  });

  return monthlyData;
};
