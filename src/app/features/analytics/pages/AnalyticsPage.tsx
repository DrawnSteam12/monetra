import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";
import MonthlySpendingChart from "../components/MonthlySpendingChart";
import BudgetInsightCard from "../components/BudgetInsightCard";
import SavingsInsightCard from "../components/SavingInsightCard";
import "../../../../assets/css/features/analytics/analytics-page.css";
import { useAnalytics } from "../hooks/useAnalytics";
import AnalyticsSummarySkeleton from "../components/skeleton/AnalyticsSummarySkeleton/AnalyticsSummarySkeleton";

import ErrorState from "../../../components/common/Error/ErrorState";

const AnalyticsPage = () => {
  const { analytics, loading, error } = useAnalytics();
  const summary = analytics?.summary;

  const monthlyTrend = analytics?.monthlyTrend ?? [];

  if (error) {
    return (
      <DashboardLayout>
        <div className="analytics-page">
          <section className="analytics-header">
            <div>
              <h1 className="analytics-title">Analytics</h1>

              <p className="analytics-subtitle">
                Monitor your spending trends and financial insights
              </p>
            </div>
          </section>

          <ErrorState
            title="Unable to load analytics"
            description="Please check your connection and try again."
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="analytics-page">
        <section className="analytics-header">
          <div>
            <h1 className="analytics-title">Analytics</h1>

            <p className="analytics-subtitle">
              Monitor your spending trends and financial insights
            </p>
          </div>
        </section>

        <section className="analytics-summary">
          {loading ? (
            <AnalyticsSummarySkeleton />
          ) : (
            <>
              <div className="analytics-card">
                <span>Total Income</span>

                <h3>₱{summary?.totalIncome.toLocaleString() ?? "0"}</h3>
              </div>

              <div className="analytics-card">
                <span>Total Expenses</span>

                <h3>₱{summary?.totalExpenses.toLocaleString() ?? "0"}</h3>
              </div>

              <div className="analytics-card">
                <span>Current Balance</span>

                <h3>₱{summary?.netSavings.toLocaleString() ?? "0"}</h3>
              </div>
            </>
          )}
        </section>

        <section className="analytics-content">
          <MonthlySpendingChart monthlyData={monthlyTrend} loading={loading} />

          <BudgetInsightCard
            budgetInsights={analytics?.budgetInsights ?? null}
            loading={loading}
          />

          <SavingsInsightCard
            savingInsights={analytics?.savingsInsights ?? null}
            loading={loading}
          />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
