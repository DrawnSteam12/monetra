import { FaShieldAlt, FaCheckCircle } from "react-icons/fa";

import SettingsSectionCard from "./SettingsSectionCard";

import "../../../../assets/css/features/settings/privacy-info-card.css";

const PrivacyInfoCard = () => {
  return (
    <SettingsSectionCard
      title="Privacy Information"
      description="Learn how Monetra stores and protects your data."
    >
      <div className="privacy-info-list">
        <div className="privacy-info-item">
          <FaCheckCircle className="privacy-info-icon" />

          <span>All transactions are stored locally on this device.</span>
        </div>

        <div className="privacy-info-item">
          <FaCheckCircle className="privacy-info-icon" />

          <span>
            Monetra does not upload your financial data to any cloud server.
          </span>
        </div>

        <div className="privacy-info-item">
          <FaCheckCircle className="privacy-info-icon" />

          <span>You can export your data anytime as CSV or JSON.</span>
        </div>

        <div className="privacy-info-item">
          <FaShieldAlt className="privacy-info-icon shield" />

          <span>
            Clearing your browser storage permanently removes local data.
          </span>
        </div>
      </div>
    </SettingsSectionCard>
  );
};

export default PrivacyInfoCard;
