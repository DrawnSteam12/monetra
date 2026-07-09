export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;

  averageIncome: number;
  averageExpense: number;

  incomeCount: number;
  expenseCount: number;
}

export interface FinancialInsights {
  savingsRate: number;
  expenseRatio: number;
  incomeRatio: number;
}

export interface TransactionData {
  _id: string;

  title: string;

  amount: number;

  category: string;

  type: "income" | "expense";

  date: string;

  note?: string;
}

export interface MonthlyTrend {
  year: number;

  month: number;

  income: number;

  expenses: number;

  cashFlow: number;
}

export interface CategoryBreakdown {
  category: string;

  total: number;

  count: number;
}

export interface DashboardResponse {
  summary: Summary;

  financialInsights: FinancialInsights;

  largestIncome: TransactionData | null;

  largestExpense: TransactionData | null;

  highestIncomeMonth: MonthlyTrend | null;

  highestExpenseMonth: MonthlyTrend | null;

  bestSavingMonth: MonthlyTrend | null;

  worstSavingMonth: MonthlyTrend | null;

  monthlyTrend: MonthlyTrend[];

  categoryBreakdown: CategoryBreakdown[];

  transactions: TransactionData[];
}