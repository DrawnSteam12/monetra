import type { BudgetAlert } from "../types/budget-alert.type";

export const getBudgetAlert = (spendingRatio: number): BudgetAlert => {
  if (spendingRatio > 80) {
    return {
      spendingRatio,
      status: "danger",
      title: "Critical Budget Warning",
      message: "You have used more than 80% of your available income ",
    };
  }

  if (spendingRatio > 60) {
    return {
      spendingRatio,
      status: "warning",
      title: "Budget Warning",
      message: "You have used more than 60% of your available income.",
    };
  }

  return {
    spendingRatio,
    status: "healthy",
    title: "Budget Healthy",
    message: "Your spending is currently within a healthy range.",
  };
};
