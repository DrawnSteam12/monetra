import AppSkeleton from "../../../../components/common/Skeleton/Skeleton";

const IncomeExpenseChartSkeleton = () => {
  return (
    <section className="dashboard-chart-card">
      <div className="chart-header">
        <div>
          <AppSkeleton width={180} height={24} />

          <div className="mt-8">
            <AppSkeleton width={150} height={16} />
          </div>
        </div>

        <div className="chart-legend">
          <AppSkeleton width={70} height={16} />

          <AppSkeleton width={70} height={16} />
        </div>
      </div>

      <div className="chart-container">
        <AppSkeleton variant="rounded" width="100%" height={280} />
      </div>
    </section>
  );
};

export default IncomeExpenseChartSkeleton;
