export type AppSettings = {
  currency: string;

  language: string;

  timezone: string;

  theme: "light" | "dark" | "system";

  emailNotifications: boolean;

  pushNotifications: boolean;

  monthlyBudget: number;

  warningThreshold: number;

  criticalThreshold: number;

  budgetAlerts: boolean;

  transactionReminders: boolean;

  weeklySummary: boolean;

  monthlyReport: boolean;
};
