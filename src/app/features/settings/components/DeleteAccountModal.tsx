import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { FaExclamationTriangle } from "react-icons/fa";

import "../../../../assets/css/features/settings/delete-account-modal.css";

type DeleteAccountModalProps = {
  open: boolean;

  onClose: () => void;

  onConfirm: () => void;
};

const DeleteAccountModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteAccountModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box className="delete-account-modal">
        <FaExclamationTriangle className="delete-modal-icon" />

        <h2>Delete Account</h2>

        <p>
          Are you sure you want to permanently delete your Monetra account?
        </p>

        <p className="delete-modal-warning">
          This action cannot be undone.
        </p>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="delete-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="delete-modal-confirm"
            onClick={onConfirm}
          >
            Delete Account
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteAccountModal;