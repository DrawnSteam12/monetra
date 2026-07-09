import AppSkeleton from "../../../../../components/common/Skeleton/Skeleton";

const AnalyticsSummarySkeleton = () => {
  return (
    <>
      <div className="analytics-card">
        <AppSkeleton width={110} height={16} />
        <AppSkeleton width={150} height={34} />
      </div>
      <div className="analytics-card">
        <AppSkeleton width={120} height={18} />

        <AppSkeleton width={150} height={34} />
      </div>

      <div className="analytics-card">
        <AppSkeleton width={130} height={18} />

        <AppSkeleton width={150} height={34} />
      </div>
    </>
  );
};

export default AnalyticsSummarySkeleton;
