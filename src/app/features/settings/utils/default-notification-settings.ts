import type { NotificationSettings } from "../types/notification-settings.type";

export const defaultNotificationSettings: NotificationSettings = {
  budgetAlerts: true,

  transactionReminders: true,

  weeklySummary: false,

  monthlyReport: true,
};
