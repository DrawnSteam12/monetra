export interface AnalyticsSummary {
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

export interface AnalyticsTransaction {
  id: string;

  title: string;

  amount: number;

  category: string;

  type: "income" | "expense";

  date: string;

  note?: string;
}

export interface CategoryBreakdown {
  category: string;

  total: number;

  count: number;
}

export interface MonthlyTrend {
  year: number;

  month: number;

  income: number;

  expenses: number;

  cashFlow: number;
}

export type MonthlyInsight = MonthlyTrend;

export interface SavingInsights {
  totalSavings: number;

  savingsRate: number;

  recommendation: string;

  status: "healthy" | "warning" | "danger";
}

export interface BudgetInsights {
  topCategory: string;

  topCategoryAmount: number;

  topCategoryPercentage: number;

  spendingRatio: number;

  recommendation: string;

  status: "healthy" | "warning" | "danger";
}

export interface AnalyticsResponse {
  summary: AnalyticsSummary;

  financialInsights: FinancialInsights;

  largestIncome: AnalyticsTransaction | null;

  largestExpense: AnalyticsTransaction | null;

  highestIncomeMonth: MonthlyInsight | null;

  highestExpenseMonth: MonthlyInsight | null;

  bestSavingMonth: MonthlyInsight | null;

  worstSavingMonth: MonthlyInsight | null;

  monthlyTrend: MonthlyTrend[];

  categoryBreakdown: CategoryBreakdown[];

  budgetInsights: BudgetInsights | null;

  transactions: AnalyticsTransaction[];

  savingsInsights: SavingInsights | null;
}
