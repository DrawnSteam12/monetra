import { useState } from "react";
import type { Transaction } from "../../../types/transaction.types";
import { useTransactions } from "../hooks/useTransactions";
import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";
import AddTransactionModal from "../components/AddtransactionModal";
import TransactionList from "../components/TransactionList";
import TransactionSearch from "../components/TransactionSearch";
import TransactionFilter from "../components/TransactionFilters";
import DeleteTransactionModal from "../components/DeleteTransactionModal";
import TransactionListSkeleton from "../components/transactionSkeleton/TransactionListSkeleton";
import "../../../../assets/css/features/transactions/transactions-page.css";
import EmptyState from "../../../components/common/EmptyState/EmptyState";
import ErrorState from "../../../components/common/Error/ErrorState";

const TransactionsPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedType, setSelectedType] = useState<
    "all" | "income" | "expense"
  >("all");

  const {
    transactions,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
    fetchTransactions,
  } = useTransactions();

  const handleAddTransaction = async (transaction: Transaction) => {
    try {
      if (isEditMode) {
        await editTransaction(transaction);

        setIsEditMode(false);

        setSelectedTransaction(undefined);

        setOpenModal(false);

        return;
      }
      await addTransaction(transaction);
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);

    setIsEditMode(true);

    setOpenModal(true);
  };

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactionToDelete(transactionId);

    setOpenDeleteModal(true);
  };

  const confirmDeleteTransaction = async () => {
    if (!transactionToDelete) return;
    await removeTransaction(transactionToDelete);

    setTransactionToDelete(null);

    setOpenDeleteModal(false);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" || transaction.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="transactions-page">
        <section className="transactions-header">
          <div>
            <h1 className="transactions-title">Transactions</h1>

            <p className="transactions-subtitle">
              Manage your income and expenses
            </p>
          </div>

          <button
            className="add-transaction-button"
            onClick={() => {
              setSelectedTransaction(undefined);

              setIsEditMode(false);

              setOpenModal(true);
            }}
          >
            + Add Transaction
          </button>
        </section>

        <section className="transactions-content">
          <TransactionSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <TransactionFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          {loading ? (
            <TransactionListSkeleton />
          ) : error ? (
            <ErrorState
              title="Unable to load transactions"
              description={error ?? "Something went wrong"}
              action={
                <button
                  className="add-transaction-button"
                  onClick={fetchTransactions}
                >
                  Retry
                </button>
              }
            />
          ) : filteredTransactions.length === 0 ? (
            <EmptyState
              title={
                transactions.length === 0
                  ? "No transactions yet"
                  : "No transactions found"
              }
              description={
                transactions.length === 0
                  ? "Start tracking your finances by adding your first transaction."
                  : "Try adjusting your search or filters."
              }
              action={
                transactions.length === 0 ? (
                  <button
                    className="add-transaction-button"
                    onClick={() => {
                      setSelectedTransaction(undefined);
                      setIsEditMode(false);
                      setOpenModal(true);
                    }}
                  >
                    {" "}
                    + Add Transaction{" "}
                  </button>
                ) : undefined
              }
            />
          ) : (
            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          )}
        </section>

        <AddTransactionModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);

            setIsEditMode(false);

            setSelectedTransaction(undefined);
          }}
          onAddTransaction={handleAddTransaction}
          initialData={selectedTransaction}
          isEdit={isEditMode}
        />
        <DeleteTransactionModal
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);

            setTransactionToDelete(null);
          }}
          onConfirm={confirmDeleteTransaction}
        />
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;
