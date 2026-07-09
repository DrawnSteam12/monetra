export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Salary"
  | "Freelance"
  | "Food"
  | "Bills"
  | "Transport"
  | "Shopping"
  | "Savings"
  | "Others";

export type Transaction = {
  id: string;

  title: string;

  amount: number;

  category: TransactionCategory;

  type: TransactionType;

  date: string;

  note?: string;
};
