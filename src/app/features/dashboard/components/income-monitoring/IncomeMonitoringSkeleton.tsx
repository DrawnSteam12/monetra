import AppSkeleton from "../../../../components/common/Skeleton/Skeleton";

const IncomeMonitoringSkeleton = () => {
  return (
    <section className="dashboard-card">
      <div className="chart-header">
        <div>
          <AppSkeleton width={220} height={24} />

          <div className="mt-8">
            <AppSkeleton width={180} height={16} />
          </div>
        </div>
      </div>

      <div className="income-monitor-grid">
        {[1, 2, 3].map((item) => (
          <div key={item} className="income-card">
            <AppSkeleton width={90} height={16} />

            <div className="mt-16">
              <AppSkeleton width={120} height={28} />
            </div>
          </div>
        ))}
      </div>

      <div className="income-progress-wrapper">
        <div className="income-progress-label">
          <AppSkeleton width={120} height={16} />
          <AppSkeleton width={59} height={16} />
        </div>

        <AppSkeleton width="100%" height={52} variant="rounded" />
      </div>
    </section>
  );
};

export default IncomeMonitoringSkeleton;
