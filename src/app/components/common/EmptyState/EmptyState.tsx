import "./empty-state.css";
import { MdOutlineReceiptLong } from "react-icons/md";

type EmptyStateProps = {
  title: string;
  description: string;

  icon?: React.ReactNode;

  action?: React.ReactNode;
};

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <MdOutlineReceiptLong />
      </div>
      <h3>{title}</h3>

      <p>{description}</p>

      {action && <div className="empty-state-action"> {action}</div>}
    </div>
  );
};

export default EmptyState;
