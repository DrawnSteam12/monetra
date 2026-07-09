import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import TransactionForm from "./TransactionForm";

import type { Transaction } from "../../../types/transaction.types";

import "../../../../assets/css/features/transactions/add-transaction-modal.css";

type AddTransactionModalProps = {
  open: boolean;

  onClose: () => void;

  onAddTransaction: (transaction: Transaction) => Promise<void>;
  
  initialData?: Transaction;

  isEdit?: boolean;
};

const AddTransactionModal = ({
  open,
  onClose,
  onAddTransaction,
  initialData,
  isEdit = false,
}: AddTransactionModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="transaction-modal">
        <div className="transaction-modal-header">
          <div>
            <h2>{isEdit ? "Edit Transaction" : "Add Transaction"}</h2>
            <p>
              {isEdit
                ? "Update transaction details"
                : "Add an income or expense"}
            </p>
          </div>

          <button className="transaction-close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="transaction-modal-content">
          <TransactionForm
            onSubmit={onAddTransaction}
            onClose={onClose}
            initialData={initialData}
            isEdit={isEdit}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default AddTransactionModal;
