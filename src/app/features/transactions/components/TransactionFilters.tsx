import "../../../../assets/css/features/transactions/transaction-filters.css";

type FilterType = "all" | "income" | "expense";

type TransactionFilterProps = {
  selectedType: FilterType;

  setSelectedType: (type: FilterType) => void;
};

const filters: FilterType[] = ["all", "income", "expense"];

const TransactionFilter = ({
  selectedType,
  setSelectedType,
}: TransactionFilterProps) => {
  return (
    <div className="transaction-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={
            selectedType === filter
              ? "transaction-filter-button active"
              : "transaction-filter-button"
          }
          onClick={() => setSelectedType(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TransactionFilter;
