import { useEffect, useState } from "react";
import type { BudgetAlertSettings } from "../types/budget-alert-settings.type";
import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";
import SettingsPageHeader from "../components/SettingsPageHeader";
import SettingsSectionCard from "../components/SettingsSectionCard";
import BudgetAlertForm from "../components/BudgetAlertForm";
import BudgetAlertCard from "../components/BudgetAlertCard";
import { getPreviewAlert } from "../utils/budget-alert-preview";
import { getSettings } from "../../../services/settings.service";
import LoadingSpinner from "../../../components/common/Loading/LoadingSpinner";
import "../../../../assets/css/features/settings/budget-alert-form.css";

const BudgetAlertSettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<BudgetAlertSettings>({
    monthlyBudget: "",
    warningThreshold: "70",
    criticalThreshold: "90",
  });

  useEffect(() => {
    const fetchBudgetSettings = async () => {
      try {
        const data = await getSettings();

        setSettings({
          monthlyBudget:
            data.monthlyBudget > 0 ? String(data.monthlyBudget) : "",
          warningThreshold: String(data.warningThreshold ?? 70),
          criticalThreshold: String(data.criticalThreshold ?? 90),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgetSettings();
  }, []);

  const previewAlert = getPreviewAlert(settings);
  return (
    <DashboardLayout>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
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
        </>
      )}
    </DashboardLayout>
  );
};

export default BudgetAlertSettingsPage;
