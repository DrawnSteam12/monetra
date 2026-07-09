import type { BudgetInsights } from "../../../types/analytics.type";
import "../../../../assets/css/features/analytics/budget-insights-card.css";
import BudgetInsightCardSkeleton from "./skeleton/BudgetInsightCardSkeleton/BudgetInsightCardSkeleton";
import EmptyState from "../../../components/common/EmptyState/EmptyState";

type BudgetInsightCardProps = {
  budgetInsights: BudgetInsights | null;

  loading: boolean;

};

const BudgetInsightCard = ({
  budgetInsights,
  loading,
}: BudgetInsightCardProps) => {
  if (loading) {
    return <BudgetInsightCardSkeleton />;
  }

  if (!budgetInsights) {
    return (
      <section className="budget-insight-card">
        <EmptyState
          title="No budget Insights"
          description="Add expense transactions to unlock budget insights."
        />
      </section>
    );
  }

  return (
    <section className="budget-insight-card">
      <div className="budget-insight-header">
        <div>
          <h2>Budget Insights</h2>

          <p>Smart spending analysis</p>
        </div>

        <span className={`budget-status ${budgetInsights.status}`}>
          {budgetInsights.status}
        </span>
      </div>
      <div className="budget-insight-content">
        <div className="budget-highlight">
          <span>Top spending category</span>

          <h3>{budgetInsights.topCategory}</h3>

          <strong>₱{budgetInsights.topCategoryAmount.toLocaleString()}</strong>

          <p>
            {budgetInsights.topCategoryPercentage.toFixed(1)}% of your total
            expenses
          </p>
        </div>
        <div className="budget-recommendation">
          <h4>Recommendation</h4>

          <p>{budgetInsights.recommendation}</p>
        </div>
      </div>
    </section>
  );
};

export default BudgetInsightCard;
