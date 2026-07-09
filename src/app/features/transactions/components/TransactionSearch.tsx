
import {
  FaSearch,
} from "react-icons/fa";

import "../../../../assets/css/features/transactions/transaction-search.css";

type TransactionSearchProps = {
  searchQuery: string;

  setSearchQuery: (
    value: string,
  ) => void;
};

const TransactionSearch = ({
  searchQuery,
  setSearchQuery,
}: TransactionSearchProps) => {
  return (
    <div className="transaction-search">
      <div className="transaction-search-wrapper">
        <FaSearch className="transaction-search-icon" />

        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(event) =>
            setSearchQuery(
              event.target.value,
            )
          }
        />
      </div>
    </div>
  );
};

export default TransactionSearch;
