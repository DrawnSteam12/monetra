import type { AppSettings } from "../types/settings.type";

export const defaultSettings: AppSettings = {
  currency: "PHP",

  language: "English",

  timezone: "Asia/Manila",

  theme: "system",

  emailNotifications: true,

  pushNotifications: true,

  monthlyBudget: 0,

  warningThreshold: 70,

  criticalThreshold: 90,

  budgetAlerts: true,

  transactionReminders: true,

  weeklySummary: false,

  monthlyReport: true,
};
