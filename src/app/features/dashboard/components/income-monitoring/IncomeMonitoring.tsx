import "../../../../../assets/css/features/dashboard/income-monitoring.css";
import IncomeMonitoringSkeleton from "./IncomeMonitoringSkeleton";
import { formatCurrency } from "../../../../utils/formatCurrency";

import type {
  Summary,
  FinancialInsights,
} from "../../../../types/dashboard.types";

type IncomeMonitoringProps = {
  summary?: Summary;
  financialInsights?: FinancialInsights;
  loading: boolean;
  error: string | null;
};

const IncomeMonitoring = ({
  summary,
  financialInsights,
  loading,
}: IncomeMonitoringProps) => {
  const income = summary?.totalIncome ?? 0;

  const expenses = summary?.totalExpenses ?? 0;

  const savingsRate = financialInsights?.savingsRate ?? 0;

  const percentageUsed = financialInsights?.expenseRatio ?? 0;

  let recommendation = "";

  let statusClass = "";

  if (savingsRate >= 50) {
    recommendation = "Excellent spending discipline";

    statusClass = "excellent";
  } else if (savingsRate >= 30) {
    recommendation = "Good financial balance";

    statusClass = "good";
  } else {
    recommendation = "Reduce discretionary spending";

    statusClass = "warning";
  }

  if (loading) {
    return <IncomeMonitoringSkeleton />;
  }

  return (
    <section
      className="dashboard-card"
      aria-labelledby="income-monitoring-title"
    >
      <div className="chart-header">
        <div>
          <h2 id="income-monitoring-title">Income-Based Monitoring</h2>

          <p>Spending analysis based on income</p>
        </div>
      </div>
      <div className="income-monitor-grid">
        <div className="income-card">
          <h4>Monthly Income</h4>

          <h2>{formatCurrency(income)}</h2>
        </div>

        <div className="income-card">
          <h4>Expenses</h4>

          <h2>{formatCurrency(expenses)}</h2>
        </div>

        <div className="income-card">
          <h4>Savings Rate</h4>

          <h2>{savingsRate.toFixed(1)}%</h2>
        </div>
      </div>
      <div className="income-progress-wrapper">
        <div className="income-progress-label">
          <span>Spending Ratio</span>

          <span>{percentageUsed.toFixed(1)}%</span>
        </div>

        <div
          className="income-progress-track"
          role="progressbar"
          aria-label="Income spending ratio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentageUsed}
        >
          <div
            className={`income-progress-fill ${statusClass}`}
            style={{
              width: `${percentageUsed}%`,
            }}
          />
        </div>
      </div>
      <p className={`income-insight ${statusClass}`}>{recommendation}</p>{" "}
    </section>
  );
};

export default IncomeMonitoring;
