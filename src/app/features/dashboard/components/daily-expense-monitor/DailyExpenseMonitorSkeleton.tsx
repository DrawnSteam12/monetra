import AppSkeleton from "../../../../components/common/Skeleton/Skeleton";

const DailyExpenseMonitorSkeleton = () => {
  return (
    <section className="dashboard-card">
      <div className="chart-header">
        <div>
          <AppSkeleton width={220} height={24} />

          <div className="mt-8">
            <AppSkeleton width={150} height={16} />
          </div>
        </div>
      </div>

      <div className="daily-monitor-content">
        {[1, 2, 3].map((item) => (
          <div key={item} className="monitor-item">
            <AppSkeleton width={90} height={16} />
            <div className="mt-14">
              <AppSkeleton width={110} height={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="budget-progress-wrapper">
        <div className="progress-label">
          <AppSkeleton width={90} height={16} />
          <AppSkeleton width={120} height={16} />
        </div>

        <AppSkeleton width="100%" height={10} variant="rounded" />
      </div>

      <div className="mt-18">
        <AppSkeleton width="100%" height={42} variant="rounded" />
      </div>
    </section>
  );
};

export default DailyExpenseMonitorSkeleton;
