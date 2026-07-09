import SummaryCard from "./SummaryCard";
import type { Summary } from "../../../../types/dashboard.types";
import "../../../../../assets/css/features/dashboard/summary-cards.css";
import SummaryCardSkeleton from "./SummaryCardSkeleton";
import { formatCurrency } from "../../../../utils/formatCurrency";

type SummaryCardsProps = {
  summary?: Summary;
  loading: boolean;
};

const SummaryCards = ({ summary, loading,  }: SummaryCardsProps) => {
  if (loading) {
    return (
      <div className="summary-cards-grid">
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
      </div>
    );
  }

  return (
    <section className="summary-cards-grid" aria-label="Financial summary">
      <SummaryCard
        title="Net Savings"
        amount={formatCurrency(summary?.netSavings ?? 0)}
        subtitle="Current balance"
      />

      <SummaryCard
        title="Income"
        amount={formatCurrency(summary?.totalIncome ?? 0)}
        subtitle="Monthly income"
      />

      <SummaryCard
        title="Expenses"
        amount={formatCurrency(summary?.totalExpenses ?? 0)}
        subtitle="Monthly expenses"
      />

      <SummaryCard
        title="Savings"
        amount={formatCurrency(summary?.netSavings ?? 0)}
        subtitle="Saved this month"
      />
    </section>
  );
};

export default SummaryCards;
