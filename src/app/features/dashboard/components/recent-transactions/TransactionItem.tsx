type TransactionItemProps = {
  title: string;

  category: string;

  amount: string;

  type: "income" | "expense";
};

const TransactionItem = ({
  title,
  category,
  amount,
  type,
}: TransactionItemProps) => {
  return (
    <article className="transaction-item" role="listitem">
      <div className="transaction-left">
        <div
          className={`transaction-icon ${
            type === "income" ? "income-bg" : "expense-bg"
          }`}
        >
          {type === "income" ? "↗" : "↘"}
        </div>

        <div className="transaction-info">
          <h4>{title}</h4>

          <p>{category}</p>
        </div>
      </div>

      <strong className={type === "income" ? "income-text" : "expense-text"}>
        {type === "income" ? "+" : "-"}
        {amount}
      </strong>
    </article>
  );
};

export default TransactionItem;
