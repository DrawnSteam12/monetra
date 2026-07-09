import AppSkeleton from "../../../../components/common/Skeleton/Skeleton";

const RecentTransactionsSkeleton = () => {
  return (
    <section className="dashboard-card">
      <div className="chart-header">
        <div>
          <AppSkeleton width={190} height={24} />

          <div className="mt-8">
            <AppSkeleton width={150} height={16} />
          </div>
        </div>
      </div>

      <div className="transaction-list">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="transaction-item">
            <div className="transaction-left">
              <AppSkeleton variant="rounded" width={48} height={48} />

              <div className="transaction-info">
                <AppSkeleton width={120} height={18} />

                <div className="mt-8">
                  <AppSkeleton width={80} height={14} />
                </div>
              </div>
            </div>

            <AppSkeleton width={80} height={20} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTransactionsSkeleton;
