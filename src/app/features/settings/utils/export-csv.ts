import type { Transaction } from "../../../types/transaction.types";
import { escapeCSV } from "./csv-escape";
import { getExportFileName } from "./get-export-file-name";

export const exportCSV = () => {
  const transactions: Transaction[] = JSON.parse(
    localStorage.getItem("monetra-transactions") || "[]",
  );

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

  const budgetAlerts = JSON.parse(
    localStorage.getItem("monetra-budget-alerts") || "{}",
  );

  const generalSettings = JSON.parse(
    localStorage.getItem("monetra-general-settings") || "{}",
  );

  const notificationSettings = JSON.parse(
    localStorage.getItem("monetra-notifications") || "{}",
  );

  const currentTheme = localStorage.getItem("theme") || "system";
  const rows = [
    ["Export Summary"],

    ["Total Transactions", transactions.length],

    ["Income Transactions", incomeTransactions.length],

    ["Expense Transactions", expenseTransactions.length],

    ["Total Income", totalIncome],

    ["Total Expenses", totalExpenses],

    ["Current Balance", currentBalance],

    [],

    ["Settings"],

    ["Category", "Setting", "Value"],

    ["Budget", "Monthly Budget", budgetAlerts.monthlyBudget ?? ""],
    ["Budget", "Warning Threshold", budgetAlerts.warningThreshold ?? ""],
    ["Budget", "Critical Threshold", budgetAlerts.criticalThreshold ?? ""],

    ["General", "Currency", generalSettings.currency ?? ""],
    ["General", "Language", generalSettings.language ?? ""],
    ["General", "Timezone", generalSettings.timezone ?? ""],

    ["Notifications", "Email", notificationSettings.email ?? ""],
    ["Notifications", "Push", notificationSettings.push ?? ""],

    ["Theme", "Theme", currentTheme],

    [],

    ["Transactions"],

    ["Title", "Amount", "Category", "Type", "Date", "Note"],

    ...transactions.map((transaction) => [
      transaction.title,
      transaction.amount,
      transaction.category,
      transaction.type,
      transaction.date,
      transaction.note ?? "",
    ]),
  ];
  const csvContent = rows.map((row) => row.map(escapeCSV).join(",")).join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = getExportFileName("csv");

  link.click();

  URL.revokeObjectURL(url);
};
