import type { BudgetAlertSettings } from "../types/budget-alert-settings.type";

import type { BudgetAlertErrors } from "../types/budget-alert-errors.type";

export const validateBudgetAlertSettings = (
  settings: BudgetAlertSettings,
): BudgetAlertErrors => {
  const errors: BudgetAlertErrors = {};

  const monthlyBudget = Number(settings.monthlyBudget);

  const warningThreshold = Number(settings.warningThreshold);

  const criticalThreshold = Number(settings.criticalThreshold);

  if (!monthlyBudget || monthlyBudget <= 0) {
    errors.monthlyBudget = "Monthly budget must be greater than 0";
  }

  if (warningThreshold < 1 || warningThreshold > 100) {
    errors.warningThreshold = "Warning threshold must be between 1 and 100";
  }

  if (criticalThreshold < 1 || criticalThreshold > 100) {
    errors.criticalThreshold = "Critical threshold must be between 1 and 100";
  }

  if (criticalThreshold <= warningThreshold) {
    errors.criticalThreshold =
      "Critical threshold must be higher than warning threshold";
  }

  return errors;
};
