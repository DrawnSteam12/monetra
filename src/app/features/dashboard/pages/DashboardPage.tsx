import { useDashboard } from "../hooks/useDashboard";

import DashboardLayout from "../components/dashboard-layout/DashboardLayout";

import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import CategorySpendingChart from "../components/charts/CategorySpendingChart";
import RecentTransactions from "../components/recent-transactions/RecentTransactions";
import DailyExpenseMonitor from "../components/daily-expense-monitor/DailyExpenseMonitor";
import IncomeMonitoring from "../components/income-monitoring/IncomeMonitoring";
import SummaryCards from "../components/summary-cards/SummaryCards";

import "../../../../assets/css/features/dashboard/dashboard-page.css";
import ErrorState from "../../../components/common/Error/ErrorState";

const DashboardPage = () => {
  const { dashboard, loading, error } = useDashboard();

  if (error) {
    return (
      <DashboardLayout>
        <div className="dashboard-page">
          <section className="dashboard-header">
            <h1 className="dashboard-title">Dashboard Overview</h1>

            <p className="dashboard-user">Track your financial progress</p>
          </section>

          <ErrorState
            title="Unable to load dashboard"
            description="Please check your connection and try again."
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <section className="dashboard-header">
          <h1 className="dashboard-title">Dashboard Overview</h1>

          <p className="dashboard-user">Track your financial progress</p>
        </section>

        <SummaryCards
          summary={dashboard?.summary}
          loading={loading}
        />

        <section className="dashboard-grid">
          <div className="grid-large">
            <IncomeExpenseChart
              monthlyTrend={dashboard?.monthlyTrend}
              loading={loading}
            />
          </div>

          <div className="grid-small">
            <CategorySpendingChart
              categoryBreakdown={dashboard?.categoryBreakdown}
              loading={loading}
            />
          </div>
        </section>

        <section className="dashboard-grid dashboard-section-spacing">
          <div className="grid-large">
            <RecentTransactions
              transactions={dashboard?.transactions}
              loading={loading}
            />
          </div>

          <div className="grid-small">
            <DailyExpenseMonitor />
          </div>
        </section>

        <section className="dashboard-section-spacing">
          <IncomeMonitoring
            summary={dashboard?.summary}
            financialInsights={dashboard?.financialInsights}
            loading={loading}
            error={error}
          />
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
