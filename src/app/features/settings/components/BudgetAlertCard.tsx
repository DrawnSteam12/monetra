import type { BudgetAlert } from "../types/budget-alert.type";

import "../../../../assets/css/features/settings/budget-alert-card.css";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

type BudgetAlertCardProps = {
  alert: BudgetAlert;
};

const BudgetAlertCard = ({ alert }: BudgetAlertCardProps) => {
  const alertIcon =
    alert.status === "healthy" ? (
      <FaCheckCircle />
    ) : alert.status === "warning" ? (
      <FaExclamationTriangle />
    ) : (
      <FaTimesCircle />
    );

  return (
    <div className={`budget-alert-card ${alert.status}`}>
      <div className="budget-alert-header">
        <span className="budget-alert-icon">{alertIcon}</span>

        <h3>{alert.title}</h3>
      </div>

      <p>{alert.message}</p>

      <strong>Spending Ratio:{alert.spendingRatio.toFixed(1)} %</strong>
    </div>
  );
};

export default BudgetAlertCard;
