import { useState, useEffect } from "react";
import type { AppSettings } from "../types/settings.type";
import { defaultSettings } from "../utils/default-settings";
import {
  getSettings,
  updateSettings,
} from "../../../services/settings.service";
import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";
import SettingsSectionCard from "../components/SettingsSectionCard";
import SettingsPageHeader from "../components/SettingsPageHeader";

const GeneralSettingsPage = () => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings({
          currency: data.currency ?? "PHP",
          language: data.language ?? "en",
          timezone: data.timezone ?? "Asia/Manila",
          theme: data.theme ?? "system",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = async (
    key: keyof AppSettings,
    value: AppSettings[keyof AppSettings],
  ) => {
    const updatedSettings = {
      ...settings,
      [key]: value,
    };

    setSettings(updatedSettings);

    try {
      await updateSettings(updatedSettings);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <SettingsPageHeader
        title="General Settings"
        description="Manage your application preferences"
      />

      <SettingsSectionCard
        title="Preferences"
        description="Currency, language and timezone settings"
      >
        <div className="setting-group">
          <label>Currency</label>

          <select
            value={settings.currency}
            onChange={(event) =>
              handleSettingChange("currency", event.target.value)
            }
          >
            <option value="PHP">PHP (₱)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Language</label>

          <select
            value={settings.language}
            onChange={(event) =>
              handleSettingChange("language", event.target.value)
            }
          >
            <option value="en">English</option>
            <option value="fil">Filipino</option>
          </select>
        </div>

        <div className="setting-group">
          <label>Timezone</label>

          <select
            value={settings.timezone}
            onChange={(event) =>
              handleSettingChange("timezone", event.target.value)
            }
          >
            <option value="Asia/Manila">Asia/Manila</option>

            <option value="UTC">UTC</option>
          </select>
        </div>
      </SettingsSectionCard>
    </DashboardLayout>
  );
};

export default GeneralSettingsPage;
