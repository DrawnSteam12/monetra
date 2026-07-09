import { useState } from "react";

import type { BudgetAlertSettings } from "../types/budget-alert-settings.type";

import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";

import SettingsPageHeader from "../components/SettingsPageHeader";

import SettingsSectionCard from "../components/SettingsSectionCard";

import BudgetAlertForm from "../components/BudgetAlertForm";

import BudgetAlertCard from "../components/BudgetAlertCard";

import { getPreviewAlert } from "../utils/budget-alert-preview";

const BudgetAlertSettingsPage = () => {
  const [settings, setSettings] = useState<BudgetAlertSettings>(() => {
    const storedSettings = localStorage.getItem("monetra-budget-alerts");

    return storedSettings
      ? JSON.parse(storedSettings)
      : {
          monthlyBudget: "",
          warningThreshold: "80",
          criticalThreshold: "95",
        };
  });

  const previewAlert = getPreviewAlert(settings);

  return (
    <DashboardLayout>
      <SettingsPageHeader
        title="Budget Alert Settings"
        description="Manage budget limits and alert levels"
      />
      <SettingsSectionCard
        title="Budget Configuration"
        description="Set your monthly budget and alert levels"
      >
        <BudgetAlertForm settings={settings} setSettings={setSettings} />
      </SettingsSectionCard>
      {Number(settings.monthlyBudget) > 0 && (
        <SettingsSectionCard
          title="Alert Preview"
          description="Preview how budget alerts will appear"
        >
          <BudgetAlertCard alert={previewAlert} />
        </SettingsSectionCard>
      )}
    </DashboardLayout>
  );
};

export default BudgetAlertSettingsPage;
