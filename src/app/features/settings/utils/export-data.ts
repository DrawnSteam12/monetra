export const getExportData = () => {
  return {
    profile: JSON.parse(localStorage.getItem("monetra-user") || "null"),

    transactions: JSON.parse(
      localStorage.getItem("monetra-transactions") || "[]",
    ),

    budgetAlerts: JSON.parse(
      localStorage.getItem("monetra-budget-alerts") || "null",
    ),

    theme: JSON.parse(
      localStorage.getItem("monetra-theme") || "null",
    ),

    notifications: JSON.parse(
      localStorage.getItem("monetra-notifications") || "null",
    ),
  };
};