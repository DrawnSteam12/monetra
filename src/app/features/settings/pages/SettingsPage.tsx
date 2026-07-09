import { useNavigate } from "react-router-dom";
import {
  FaCog,
  FaPalette,
  FaBell,
  FaShieldAlt,
  FaWallet,
  FaDatabase,
  FaTrashAlt,
} from "react-icons/fa";
import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";

import SettingsNavigationCard from "../components/SettingsNavigationCard";

import "../../../../assets/css/features/settings/settings-page.css";

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="settings-page">
        <section className="settings-header">
          <div>
            <h1 className="settings-title">Settings</h1>

            <p className="settings-subtitle">
              Customize your Monetra experience and preferences
            </p>
          </div>
        </section>

        <section className="settings-content">
          <SettingsNavigationCard
            icon={<FaCog />}
            title="General Settings"
            description="Manage app preferences"
            onClick={() => navigate("/settings/general")}
          />

          <SettingsNavigationCard
            icon={<FaPalette />}
            title="Theme Settings"
            description="Customize appearance preferences"
            onClick={() => navigate("/settings/theme")}
          />

          <SettingsNavigationCard
            icon={<FaBell />}
            title="Notification Settings"
            description="Manage notification preferences"
            onClick={() => navigate("/settings/notifications")}
          />

          <SettingsNavigationCard
            icon={<FaShieldAlt />}
            title="Security Settings"
            description="Manage account security"
            onClick={() => navigate("/settings/security")}
          />

          <SettingsNavigationCard
            icon={<FaWallet />}
            title="Budget Alerts"
            description="Manage budget limits and alert thresholds"
            onClick={() => navigate("/settings/budget-alert")}
          />

          <SettingsNavigationCard
            icon={<FaDatabase />}
            title="Data & Privacy"
            description="Export your financial data and manage privacy"
            onClick={() => navigate("/settings/data-privacy")}
          />
          <SettingsNavigationCard
            icon={<FaTrashAlt />}
            title="Delete Account"
            description="Permanently remove your account"
            onClick={() => navigate("/settings/delete-account")}
          />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
