import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

type DeleteTransactionModalProps = {
  open: boolean;

  onClose: () => void;

  onConfirm: () => void;
};

const DeleteTransactionModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteTransactionModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="delete-transaction-modal">
        <h2>Delete Transaction</h2>

        <p>
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </p>

        <div className="delete-transaction-actions">
          <button className="delete-cancel-button" onClick={onClose}>
            Cancel
          </button>

          <button className="delete-confirm-button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteTransactionModal;
