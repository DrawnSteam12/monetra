import { createContext, useContext, useState } from "react";

import type { ReactNode } from "react";

import type { Transaction } from "../../types/transaction.types";

type AppDataContextType = {
  transactions: Transaction[];

  addTransaction: (transaction: Transaction) => void;

  updateTransaction: (transaction: Transaction) => void;

  deleteTransaction: (transactionId: string) => void;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

type AppDataProviderProps = {
  children: ReactNode;
};

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storedTransactions = localStorage.getItem("monetra-transactions");

    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  const addTransaction = (transaction: Transaction) => {
    setTransactions((previous) => {
      const updatedTransactions = [transaction, ...previous];

      localStorage.setItem(
        "monetra-transactions",
        JSON.stringify(updatedTransactions),
      );
      return updatedTransactions;
    });
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((previous) => {
      const updatedTransactions = previous.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      );

      localStorage.setItem(
        "monetra-transactions",
        JSON.stringify(updatedTransactions),
      );

      return updatedTransactions;
    });
  };

  const deleteTransaction = (transactionId: string) => {
    setTransactions((previous) => {
      const updatedTransactions = previous.filter(
        (transaction) => transaction.id !== transactionId,
      );

      localStorage.setItem(
        "monetra-transactions",
        JSON.stringify(updatedTransactions),
      );

      return updatedTransactions;
    });
  };

  return (
    <AppDataContext.Provider
      value={{
        transactions,

        addTransaction,

        updateTransaction,

        deleteTransaction,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return context;
};
