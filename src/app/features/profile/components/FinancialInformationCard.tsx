import { FaMoneyBillWave, FaPiggyBank } from "react-icons/fa";

import "../../../../assets/css/features/profile/financial-information-card.css";

import type { UserProfile } from "../types/profile.types";

type FinancialInformationCardProps = {
  profile: UserProfile;
};

const FinancialInformationCard = ({
  profile,
}: FinancialInformationCardProps) => {
  const hasIncome = profile.monthlyIncome > 0;

  const hasSavingsGoal = profile.savingsGoal > 0;

  return (
    <section className="financial-information-card">
      <div className="financial-header">
        <div>
          <h2>Financial Information</h2>

          <p>Youe financial goals and preferences</p>
        </div>
      </div>

      <div className="financial-list">
        <FaMoneyBillWave />

        <div>
          <div className="financial-content">
            <span>Monthly Income</span>

            <strong>
              {hasIncome
                ? `₱${profile.monthlyIncome.toLocaleString()}`
                : "Not set"}
            </strong>

            <p>
              {hasIncome
                ? "Your estimated monthly earinings"
                : "Add your income to unlock budgeting insights"}
            </p>
          </div>
        </div>

        <div className="financial-item-card">
          <div className="financial-icon-wrapper">
            <FaPiggyBank />
          </div>

          <div className="financial-content">
            <span> Savings Goal</span>
          </div>

          <strong>
            {hasSavingsGoal ? `₱${profile.savingsGoal.toLocaleString()}` : ""}
          </strong>

          <p>
            {hasSavingsGoal
              ? "Your personal savings target"
              : "Set a savings goal to track progress"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinancialInformationCard;
