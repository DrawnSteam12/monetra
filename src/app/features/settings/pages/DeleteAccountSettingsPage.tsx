import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";
import DeleteAccountWarning from "../components/DeleteAccountWarning";
import SettingsPageHeader from "../components/SettingsPageHeader";
import SettingsSectionCard from "../components/SettingsSectionCard";
import DeleteConfirmationInput from "../components/DeleteConfirmationInput";
import DeleteAccountButton from "../components/DeleteAccountButton";
import DeleteAccountModal from "../components/DeleteAccountModal";
import DeleteSuccessModal from "../components/DeleteSuccessModal";
import { deleteAccountData } from "../utils/delete-account";

const DeleteAccountSettingsPage = () => {
  const [confirmationText, setConfirmationText] = useState("");

  const canDelete = confirmationText === "DELETE";

  const [openModal, setOpenModal] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    deleteAccountData();

    setOpenModal(false);

    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);

    setConfirmationText("");

    navigate("/login");
  };

  return (
    <DashboardLayout>
      <SettingsPageHeader
        title="Delete Account"
        description="Permanently remove your Monetra account and all locally stored data."
      />

      <SettingsSectionCard
        title="Delete Account"
        description="Deleting your account is permanent and cannot be undone."
      >
        <DeleteAccountWarning />
        <DeleteConfirmationInput
          value={confirmationText}
          onChange={setConfirmationText}
        />

        <DeleteAccountButton
          disabled={!canDelete}
          onClick={() => setOpenModal(true)}
        />
      </SettingsSectionCard>

      <DeleteAccountModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleDeleteAccount}
      />

      <DeleteSuccessModal open={showSuccessModal} onContinue={handleContinue} />
    </DashboardLayout>
  );
};

export default DeleteAccountSettingsPage;
