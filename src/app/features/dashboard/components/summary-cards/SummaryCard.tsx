type SummaryCardProps = {
  title: string;

  amount: string;

  subtitle: string;
};

const SummaryCard = ({ title, amount, subtitle }: SummaryCardProps) => {
  return (
    <article className="summary-card" aria-label={`${title}: ${amount}`}>
      <h3>{title}</h3>

      <h2>{amount}</h2>

      <p>{subtitle}</p>
    </article>
  );
};

export default SummaryCard;
