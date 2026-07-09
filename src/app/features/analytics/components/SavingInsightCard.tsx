import type { SavingInsights } from "../../../types/analytics.type";
import EmptyState from "../../../components/common/EmptyState/EmptyState";
import SavingInsightCardSkeleton from "./skeleton/SavingInsightCardSkeleton/SavingInsightCardSkeleton";

import "../../../../assets/css/features/analytics/savings-insight-card.css";

type SavingsInsightCardProps = {
  savingInsights: SavingInsights | null;

  loading: boolean;
};

const SavingInsightCard = ({
  savingInsights,
  loading,
}: SavingsInsightCardProps) => {
  if (loading) {
    return <SavingInsightCardSkeleton />;
  }

  if (!savingInsights) {
    return (
      <section className="saving-insight-card">
        <EmptyState
          title="No saving Insights"
          description="Add income transacitons to unlock saving analytics."
        />
      </section>
    );
  }

  return (
    <section className="savings-insight-card">
      <div className="savings-insight-header">
        <div>
          <h2>Saving Insights</h2>

          <p> Your financial health overview</p>
        </div>
        <span className={`savings-status ${savingInsights.status}`}>
          {savingInsights.status}
        </span>
      </div>

      <div className="savings-insight-content">
        <div className="savings-highlight">
          <span>Total Savings</span>

          <h3>₱{savingInsights.totalSavings.toLocaleString()}</h3>

          <strong>{savingInsights.savingsRate.toFixed(1)}% saving rate</strong>
        </div>
        <div className="savings-recommendation">
          <h4>Recommendation</h4>

          <p>{savingInsights.recommendation}</p>
        </div>
      </div>
    </section>
  );
};

export default SavingInsightCard;
