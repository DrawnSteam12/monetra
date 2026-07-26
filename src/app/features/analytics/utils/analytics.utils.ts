import type { Transaction } from "../../../types/transaction.types";

type MonthlyExpenseData = {
  month: string;

  income: number;

  expense: number;
};

export const getMonthlyAnalytics = (
  transactions: Transaction[],
): MonthlyExpenseData[] => {
  const monthlyMap = new Map<string, MonthlyExpenseData>();

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.toLocaleString("default", {
      month: "short",
    });
    if (!monthlyMap.has(month)) {
      monthlyMap.set(month, {
        month,

        income: 0,

        expense: 0,
      });
    }

    const existing = monthlyMap.get(month);
    if (!existing) return;

    if (transaction.type === "income") {
      existing.income += transaction.amount;
    } else {
      existing.expense += transaction.amount;
    }
  });

  return Array.from(monthlyMap.values());
};
