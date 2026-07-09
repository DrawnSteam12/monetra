import { useCallback, useEffect, useState } from "react";

import type { Transaction } from "../../../types/transaction.types";

import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../../services/transaction.service";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getTransactions();

      setTransactions(data);
    } catch (err) {
      console.error(err);

      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = useCallback(
    async (transaction: Transaction) => {
      try {
        setError(null);

        await createTransaction(transaction);

        await fetchTransactions();
      } catch (err) {
        console.error(err);

        setError("Failed to create transaction");

        throw err;
      }
    },
    [fetchTransactions],
  );

  const editTransaction = useCallback(
    async (transaction: Transaction) => {
      try {
        setError(null);

        await updateTransaction(transaction);

        await fetchTransactions();
      } catch (err) {
        console.error(err);

        setError("Failed to update transaction");

        throw err;
      }
    },
    [fetchTransactions],
  );

  const removeTransaction = useCallback(
    async (transactionId: string) => {
      try {
        setError(null);

        await deleteTransaction(transactionId);

        await fetchTransactions();
      } catch (err) {
        console.error(err);

        setError("Failed to delete transaction");

        throw err;
      }
    },
    [fetchTransactions],
  );

  return {
    transactions,
    loading,
    error,

    fetchTransactions,

    addTransaction,
    editTransaction,
    removeTransaction,
  };
};
