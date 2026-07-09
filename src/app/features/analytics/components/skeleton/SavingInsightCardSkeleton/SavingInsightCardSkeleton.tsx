import AppSkeleton from "../../../../../components/common/Skeleton/Skeleton";

import "./saving-insight-card-skeleton.css";

const SavingInsightCardSkeleton = () => {
  return (
    <section className="saving-insight-card">
      <div className="saving-insight-header">
        <div className="saving-skeleton-title">
          <AppSkeleton width={170} height={30} />

          <AppSkeleton width={150} height={18} />
        </div>
        <AppSkeleton width={90} height={34} />
      </div>

      <div className="savings-insight-content">
        <div className="savings-highlight">
          <AppSkeleton width={120} height={18} />

          <AppSkeleton width={180} height={36} />

          <AppSkeleton width={140} height={28} />

          <AppSkeleton width="75%" height={18} />
        </div>

        <div className="savings-recommendation">
          <AppSkeleton width={130} height={22} />
          <AppSkeleton width="100%" height={18} />

          <AppSkeleton width="88%" height={18} />
        </div>
      </div>
    </section>
  );
};

export default SavingInsightCardSkeleton;
