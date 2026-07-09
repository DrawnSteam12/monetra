import { FaPen, FaTrash } from "react-icons/fa";

import { allCategories } from "../config/transaction-categories";

import type { Transaction } from "../../../types/transaction.types";

type TransactionCardProps = {
  transaction: Transaction;

  onEdit: (transaction: Transaction) => void;

  onDelete: (transactionId: string) => void;
};

const TransactionCard = ({
  transaction,
  onEdit,
  onDelete,
}: TransactionCardProps) => {
  const selectedCategory = allCategories.find(
    (category) => category.value === transaction.category,
  );

  const categoryIcon = selectedCategory?.icon;

  const categoryColor = selectedCategory?.color ?? "others-bg";

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <article className="transaction-card">
      <div className="transaction-card-left">
        <div className={`transaction-card-icon ${categoryColor}`}>
          {categoryIcon}
        </div>

        <div className="transaction-card-info">
          <h3>{transaction.title}</h3>

          <p>{transaction.category}</p>

          {transaction.note && (
            <span className="transaction-note">{transaction.note}</span>
          )}
        </div>
      </div>

      <div className="transaction-card-right">
        <strong
          className={
            transaction.type === "income" ? "income-text" : "expense-text"
          }
        >
          {transaction.type === "income" ? "+" : "-"}₱
          {transaction.amount.toLocaleString()}
        </strong>

        <span>{formattedDate}</span>

        <div className="transaction-actions">
          <button
            className="transaction-edit-button"
            onClick={() => onEdit(transaction)}
          >
            <FaPen />

            <span>Edit</span>
          </button>

          <button
            className="transaction-delete-button"
            onClick={() => onDelete(transaction.id)}
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default TransactionCard;
