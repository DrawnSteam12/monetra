import { useMemo } from "react";

import TransactionItem from "./TransactionItem";
import "../../../../../assets/css/features/dashboard/recent-transactions.css";
import type { TransactionData } from "../../../../types/dashboard.types";
import RecentTransactionsSkeleton from "./RecentTransactionsSkeleton";
import EmptyState from "../../../../components/common/EmptyState/EmptyState";
import { formatCurrency } from "../../../../utils/formatCurrency";

type RecentTransactionsProps = {
  transactions?: TransactionData[];
  loading: boolean;
};

const RecentTransactions = ({
  transactions,
  loading,
}: RecentTransactionsProps) => {
  const formattedTransactions = useMemo(() => {
    return (
      transactions?.map((transaction) => ({
        id: transaction._id,

        title: transaction.title,

        category: transaction.category,

        amount: formatCurrency(transaction.amount),

        type: transaction.type,
      })) ?? []
    );
  }, [transactions]);

  if (loading) {
    return <RecentTransactionsSkeleton />;
  }

  if (formattedTransactions.length === 0) {
    return (
      <section
        className="dashboard-card"
        aria-labelledby="recent-transaction-title"
      >
        <div className="chart-header">
          <div>
            <h2 id="recent-transaction-title">Recent Transactions</h2>
            <p>Latest financial activity</p>
          </div>
        </div>

        <EmptyState
          title="No transactions yet"
          description="Start by adding your first transaction to see it here."
        />
      </section>
    );
  }
  return (
    <section
      className="dashboard-card"
      aria-labelledby="recent-transaction-title"
    >
      <div className="chart-header">
        <div>
          <h2 id="recent-transaction-title">Recent Transactions</h2>

          <p>Latest financial activity</p>
        </div>
      </div>

      <div className="transaction-list" role="list">
        {formattedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            title={transaction.title}
            category={transaction.category}
            amount={transaction.amount}
            type={transaction.type}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentTransactions;
