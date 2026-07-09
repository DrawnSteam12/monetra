import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

import "../../../../assets/css/features/settings/delete-account-warning.css";

const DeleteAccountWarning = () => {
  return (
    <div className="delete-account-warning">
      <div className="delete-warning-header">
        <FaExclamationTriangle className="delete-warning-icon" />

        <p className="delete-warning-description">
          Deleting your account will permanently remove:
        </p>
      </div>

      <ul className="delete-warning-list">
        <li>
          <FaCheckCircle />
          Profile Information
        </li>

        <li>
          <FaCheckCircle />
          Transactions
        </li>
        <li>
          <FaCheckCircle />
          Budget Alert
        </li>

        <li>
          <FaCheckCircle />
          Notification Settings
        </li>
        <li>
          <FaCheckCircle />
          General Settings
        </li>

        <li>
          <FaCheckCircle />
          Theme Preference
        </li>
      </ul>

      <p className="delete-warning-footer">This action cannot be undone</p>
    </div>
  );
};

export default DeleteAccountWarning;
