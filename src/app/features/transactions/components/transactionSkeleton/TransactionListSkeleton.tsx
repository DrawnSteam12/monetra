import AppSkeleton from "../../../../components/common/Skeleton/Skeleton";

import "./transaction-list-skeleton.css";

const TransactionListSkeleton = () => {
  return (
    <div className="transaction-skeleton-container">
      <div className="transaction-skeleton-header">
        <AppSkeleton width={180} height={30} />

        <div style={{ marginTop: 8 }}>
          <AppSkeleton width={240} height={18} />
        </div>
      </div>

      <div className="transaction-skeleton-list">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="transaction-skeleton-card"
          >
            <div className="transaction-skeleton-left">

              <AppSkeleton
                width={52}
                height={52}
                variant="rounded"
              />

              <div className="transaction-skeleton-info">

                <AppSkeleton width={170} height={18} />

                <AppSkeleton width={100} height={14} />

                <AppSkeleton width={140} height={13} />

              </div>

            </div>

            <div className="transaction-skeleton-right">

              <AppSkeleton width={90} height={20} />

              <AppSkeleton width={70} height={14} />

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionListSkeleton;