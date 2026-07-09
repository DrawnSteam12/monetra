import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";

import ChangePasswordForm from "../components/ChangePasswordForm";

import SettingsSectionCard from "../components/SettingsSectionCard";

import SettingsPageHeader from "../components/SettingsPageHeader";

import SecurityTipsCard from "../components/SecurityTipsCard";

const SecuritySettingsPage = () => {
  return (
    <DashboardLayout>
      <SettingsPageHeader
        title="Security Settings"
        description="Protect your account and personal data"
      />
      <SettingsSectionCard
        title="Password Management"
        description="Update your account password"
      >
        <ChangePasswordForm />
      </SettingsSectionCard>

      <SecurityTipsCard />
    </DashboardLayout>
  );
};
export default SecuritySettingsPage;
