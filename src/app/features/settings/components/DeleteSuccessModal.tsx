import { FaCheckCircle } from "react-icons/fa";

import "../../../../assets/css/features/settings/delete-success-modal.css";

type DeleteSuccessModalProps = {
  open: boolean;

  onContinue: () => void;
};

const DeleteSuccessModal = ({ open, onContinue }: DeleteSuccessModalProps) => {
  if (!open) return null;

  return (
    <div className="delete-success-overlay">
      <div className="delete-success-modal">
        <FaCheckCircle className="delete-success-icon" />

        <h2>Account Deleted</h2>

        <p>
          Your Monetra account and all locally stored data have been removed
          successfully
        </p>

        <button className="delete-success-button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default DeleteSuccessModal;
