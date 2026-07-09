import { FaDesktop, FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "../../../context/theme-context/ThemeContext";

import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";

import SettingsSectionCard from "../components/SettingsSectionCard";

import SettingsPageHeader from "../components/SettingsPageHeader";

import "../../../../assets/css/features/settings/settings-page.css";

const ThemeSettingsPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DashboardLayout>
      <SettingsPageHeader
        title="Theme Settings"
        description="Customize the appearance of Monetra"
      />
      <SettingsSectionCard
        title="Appearance"
        description="Choose how Monetra looks"
      >
        <div className="theme-options">
          <button
            className={`theme-option ${
              theme === "light" ? "active-theme" : ""
            }`}
            onClick={() => setTheme("light")}
          >
            <FaSun />
            <span>Light</span>
          </button>

          <button
            className={`theme-option ${theme === "dark" ? "active-theme" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <FaMoon />
            <span>Dark</span>
          </button>

          <button
            className={`theme-option ${theme === "system" ? "active-theme" : ""}`}
            onClick={() => setTheme("system")}
          >
            <FaDesktop />
            <span>System</span>
          </button>
        </div>
      </SettingsSectionCard>
    </DashboardLayout>
  );
};

export default ThemeSettingsPage;
