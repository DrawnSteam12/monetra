import "../../../../../assets/css/features/dashboard/daily-expense-monitor.css";
import { formatCurrency } from "../../../../utils/formatCurrency";

// import DailyExpenseMonitorSkeleton from "./DailyExpenseMonitorSkeleton";

const DailyExpenseMonitor = () => {
  const dailyBudget = 1500;

  const todaySpent = 950;

  const remaining = dailyBudget - todaySpent;

  const isExceeded = todaySpent > dailyBudget;

  const progress = Math.min((todaySpent / dailyBudget) * 100, 100);

  // if (loading) {
  //   return <DailyExpenseMonitorSkeleton />;
  // }
  return (
    <section className="dashboard-card">
      <div className="chart-header">
        <div>
          <h2>Daily Expense Monitor</h2>

          <p>Track today's spending</p>
        </div>
      </div>

      <div className="daily-monitor-content">
        <div className="monitor-item">
          <h4>Daily Budget</h4>

          <h2>{formatCurrency(dailyBudget)}</h2>
        </div>

        <div className="monitor-item">
          <h4>Spent Today</h4>

          <h2>{formatCurrency(todaySpent)}</h2>
        </div>

        <div className="monitor-item">
          <h4>Remaining</h4>

          <h2>{formatCurrency(remaining)}</h2>
        </div>
      </div>

      <div className="budget-progress-wrapper">
        <div className="progress-label">
          <span>{Math.round(progress)}% Used</span>

          <span>
            {formatCurrency(todaySpent)}/ {formatCurrency(dailyBudget)}
          </span>
        </div>

        <div className="budget-progress-track">
          <div
            className={`budget-progress-fill ${isExceeded ? "danger" : "safe"}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className={isExceeded ? "budget-warning" : "budget-safe"}>
        {isExceeded ? "Budget exceeded today" : "Healthy spending today"}
      </div>
    </section>
  );
};

export default DailyExpenseMonitor;
