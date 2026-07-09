import { useMemo } from "react";

import type {
  Transaction,
  TransactionType,
} from "../../../types/transaction.types";

type FilterType = "all" | TransactionType;

export const useTransactionFilters = (
  transactions: Transaction[],

  searchQuery: string,

  selectedType: FilterType,

  selectedCategory: string,
) => {
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        transaction.title.toLowerCase().includes(search) ||
        transaction.category.toLowerCase().includes(search) ||
        transaction.note?.toLowerCase().includes(search);

      const matchesType =
        selectedType === "all" || transaction.type === selectedType;

      const matchesCategory =
        selectedCategory === "all" || transaction.category === selectedCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchQuery, selectedType, selectedCategory]);

  return filteredTransactions;
};
