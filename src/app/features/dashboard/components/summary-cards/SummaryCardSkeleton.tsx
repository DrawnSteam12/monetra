import AppSkeleton from "../../../../components/common/Skeleton/Skeleton";

const SummaryCardSkeleton = () => {
  return (
    <div className="summary-card">
      <AppSkeleton width="45%" height={18} />

      <div>
        <AppSkeleton width="70%" height={36} />
      </div>

      <div>
        <AppSkeleton width="35%" height={16} />
      </div>
    </div>
  );
};

export default SummaryCardSkeleton;
