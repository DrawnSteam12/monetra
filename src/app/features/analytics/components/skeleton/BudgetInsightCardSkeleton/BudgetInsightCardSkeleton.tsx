import Appskeleton from "../../../../../components/common/Skeleton/Skeleton";

import "./budget-insight-card-skeleton.css";

const BudgetInsightCardSkeleton = () => {
  return (
    <section className="budget-insight-card">
      <div className="budget-insight-header">
        <div className="budget-skeleton-title">
          <Appskeleton width={170} height={30} />

          <Appskeleton width={140} height={18} />
        </div>
        <Appskeleton width={90} height={34} />
      </div>

      <div className="budget-insight-content">
        <div className="budget-highlight">
          <Appskeleton width={130} height={18} />

          <Appskeleton width={180} height={36} />

          <Appskeleton width={120} height={28} />

          <Appskeleton width="85%" height={18} />
        </div>

        <div className="budget-recommendation" />
        <Appskeleton width={130} height={12} />

        <Appskeleton width="100%" height={18} />

        <Appskeleton width="90%" height={18} />
      </div>
    </section>
  );
};

export default BudgetInsightCardSkeleton;
