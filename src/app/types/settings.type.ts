export type Theme = "light" | "dark" | "system";

export interface Settings {
  theme: Theme;

  monthlyBudget: number;

  warningThreshold: number;

  criticalThreshold: number;

  budgetAlerts: boolean;

  transactionReminders: boolean;

  weeklySummary: boolean;

  monthlyReport: boolean;
}

export interface SettingsUpdate {
  theme?: "light" | "dark" | "system";

  monthlyBudget?: number;

  warningThreshold?: number;

  criticalThreshold?: number;

  budgetAlerts?: boolean;

  transactionReminders?: boolean;

  weeklySummary?: boolean;

  monthlyReport?: boolean;
}
