import TransactionCard from "./TransactionCard";

import type { Transaction } from "../../../types/transaction.types";

import "../../../../assets/css/features/transactions/transaction-list.css";

type TransactionListProps = {
  transactions: Transaction[];

  onEdit: (transaction: Transaction) => void;

  onDelete: (transactionId: string) => void;
};

const TransactionList = ({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) => {
  return (
    <section className="transaction-list-container">
      <div className="transaction-list-header">
        <div>
          <h2>Transactions</h2>

          <p>
            {transactions.length} total transaction
            {transactions.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default TransactionList;
