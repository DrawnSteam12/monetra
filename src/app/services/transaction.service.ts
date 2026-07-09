import API_BASE_URL from "../api/apiClient";

import type { Transaction } from "../types/transaction.types";

export const createTransaction = async (
  transaction: Transaction,
): Promise<Transaction> => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  const data = await response.json();

  return data.transaction;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(`${API_BASE_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  const data = await response.json();

  return data.transactions;
};

export const updateTransaction = async (
  transaction: Transaction,
): Promise<Transaction> => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(
    `${API_BASE_URL}/transactions/${transaction.id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(transaction),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update transaction");
  }
  const data = await response.json();

  return data.transaction;
};

export const deleteTransaction = async (
  transactionId: string,
): Promise<void> => {
  const token = localStorage.getItem("monetra-token");

  const response = await fetch(
    `${API_BASE_URL}/transactions/${transactionId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete transaction");
  }
};
