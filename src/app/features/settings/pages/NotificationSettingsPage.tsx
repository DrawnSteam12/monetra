import { useState } from "react";

import type { NotificationSettings } from "../types/notification-settings.type";

import { defaultNotificationSettings } from "../utils/default-notification-settings";

import { useAppData } from "../../../context/app-data-context/AppDataContext";
import { useBudgetInsights } from "../../analytics/hooks/useBudgetInsights";
import { getBudgetAlert } from "../utils/budget-alert";
import BudgetAlertCard from "../components/BudgetAlertCard";

import SettingsPageHeader from "../components/SettingsPageHeader";

import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";

import SettingsSectionCard from "../components/SettingsSectionCard";

import NotificationToggle from "../components/NotificationToggle";

import "../../../../assets/css/features/settings/settings-page.css";
import {
  FaCalendarWeek,
  FaChartPie,
  FaReceipt,
  FaWallet,
} from "react-icons/fa";

const NotificationSettingsPage = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>(
    () => {
      const storedNotifications = localStorage.getItem("monetra-notifications");

      return storedNotifications
        ? JSON.parse(storedNotifications)
        : defaultNotificationSettings;
    },
  );

  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications((prev) => {
      const updated = {
        ...prev,
        [key]: !prev[key],
      };

      localStorage.setItem("monetra-notifications", JSON.stringify(updated));

      return updated;
    });
  };

  const { transactions } = useAppData();

  const budgetInsights = useBudgetInsights(transactions);

  const alert = budgetInsights
    ? getBudgetAlert(budgetInsights.spendingRatio)
    : null;

  return (
    <DashboardLayout>
      <SettingsPageHeader
        title="Notification Settings"
        description="Manage your notification preferences"
      />
      <SettingsSectionCard
        title="Notifications"
        description="Control alerts and reminders"
      >
        <NotificationToggle
          icon={<FaWallet />}
          title="Budget Alerts"
          description="Receive alerts when nearing your budget limit"
          enabled={notifications.budgetAlerts}
          onToggle={() => handleNotificationToggle("budgetAlerts")}
        />

        <NotificationToggle
          icon={<FaReceipt />}
          title="Transaction Reminders"
          description="Get reminders to record transactions"
          enabled={notifications.transactionReminders}
          onToggle={() => handleNotificationToggle("transactionReminders")}
        />

        <NotificationToggle
          icon={<FaCalendarWeek />}
          title="Weekly Summary"
          description="Receive a weekly spending summary"
          enabled={notifications.weeklySummary}
          onToggle={() => handleNotificationToggle("weeklySummary")}
        />

        <NotificationToggle
          icon={<FaChartPie />}
          title="Monthly Report"
          description="Receive monthly financial reports"
          enabled={notifications.monthlyReport}
          onToggle={() => handleNotificationToggle("monthlyReport")}
        />
        {alert && notifications.budgetAlerts && (
          <BudgetAlertCard alert={alert} />
        )}
      </SettingsSectionCard>
    </DashboardLayout>
  );
};

export default NotificationSettingsPage;
