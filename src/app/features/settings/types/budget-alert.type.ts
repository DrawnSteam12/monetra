export type BudgetAlert = {
  spendingRatio: number;

  status: "healthy" | "warning" | "danger";

  title: string;

  message: string;
};
