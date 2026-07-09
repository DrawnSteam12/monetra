import type { BudgetAlert } from "../types/budget-alert.type";
import type { BudgetAlertSettings } from "../types/budget-alert-settings.type";

export const getPreviewAlert = (settings: BudgetAlertSettings): BudgetAlert => {
  const spendingRatio = 50;

  const warningThreshold = Number(settings.warningThreshold);

  const criticalThreshold = Number(settings.criticalThreshold);

  if (spendingRatio >= criticalThreshold) {
    return {
      spendingRatio,
      status: "danger",
      title: "Critical Budget Usage",
      message: "You are close to exceeding your budget",
    };
  }

  if (spendingRatio >= warningThreshold) {
    return {
      spendingRatio,
      status: "warning",
      title: "Budget Warning",
      message: "Your spending is approaching the limit",
    };
  }

  return {
    spendingRatio,
    status: "healthy",
    title: "Healthy Budget Usage",
    message: "Your spending is within the safe range",
  };
};
