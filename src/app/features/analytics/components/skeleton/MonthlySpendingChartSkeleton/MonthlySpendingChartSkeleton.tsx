import AppSkeleton from "../../../../../components/common/Skeleton/Skeleton";

import "./monthly-spending-chart-skeleton.css";

const MonthlySpendingChartSkeleton = () => {
  return (
    <section className="monthly-chart-card">
      <div className="monthly-chart-header">
        <div className="monthly-chart-skeleton-title">
          <AppSkeleton width={190} height={30} />
          <AppSkeleton width={170} height={18} />
        </div>
      </div>

      <div className="monthly-chart-wrapper">
        <div className="monthly-chart-skeleton">
          <AppSkeleton width="100%" height="100%" variant="rounded" />
        </div>
      </div>
    </section>
  );
};

export default MonthlySpendingChartSkeleton;
