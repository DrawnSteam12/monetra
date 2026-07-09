import AppSkeleton from "../../../../components/common/Skeleton/Skeleton";

const CategorySpendingChartSkeleton = () => {
  return (
    <section className="dashboard-chart-card">
      <div className="chart-header">
        <div>
          <AppSkeleton width={190} height={24} />

          <div className="mt-8">
            <AppSkeleton width={160} height={16} />
          </div>  
        </div>
      </div>

      <div className="pie-chart-container flex-center">
        <AppSkeleton variant="circular" width={170} height={170} />
      </div>

      <div className="category-legend">
        <AppSkeleton width={70} height={16} />
        <AppSkeleton width={70} height={16} />
        <AppSkeleton width={70} height={16} />
        <AppSkeleton width={70} height={16} />
      </div>
    </section>
  );
};

export default CategorySpendingChartSkeleton;
