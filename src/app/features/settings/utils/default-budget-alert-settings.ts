import type { BudgetAlertSettings } from "../types/budget-alert-settings.type";

export const defaultBudgetAlertSettings: BudgetAlertSettings = {
  monthlyBudget: "10000",

  warningThreshold: "80",

  criticalThreshold: "95",
};
