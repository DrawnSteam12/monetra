import type { Transaction } from "../../../types/transaction.types";
import { getExportFileName } from "./get-export-file-name";

export const exportJSON = () => {
  const transactions: Transaction[] = JSON.parse(
    localStorage.getItem("monetra-transactions") || "[]",
  );

  const budgetAlerts = JSON.parse(
    localStorage.getItem("monetra-budget-alerts") || "{}",
  );

  const notificationSettings = JSON.parse(
    localStorage.getItem("monetra-notifications") || "{}",
  );

  const generalSettings = JSON.parse(
    localStorage.getItem("monetra-general-settings") || "{}",
  );

  const currentTheme = localStorage.getItem("theme") || "system";

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income",
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const totalIncome = incomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  const totalExpenses = expenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  const currentBalance = totalIncome - totalExpenses;

  const data = {
    metadata: {
      app: "Monetra",
      version: "1.0.0",
      exportedAt: new Date().toISOString(),

      transactionCount: transactions.length,

      incomeTransactionCount: incomeTransactions.length,

      expenseTransactionCount: expenseTransactions.length,

      totalIncome,

      totalExpenses,

      currentBalance,
    },

    settings: {
      general: generalSettings,

      notifications: notificationSettings,

      budgetAlerts,

      theme: {
        theme: currentTheme,
      },
    },

    transactions,
  };

  const json = JSON.stringify(data, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = getExportFileName("json");

  link.click();

  URL.revokeObjectURL(url);
};
