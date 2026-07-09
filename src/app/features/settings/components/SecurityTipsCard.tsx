import { FaShieldAlt, FaLock, FaKey, FaUserShield } from "react-icons/fa";

import "../../../../assets/css/features/settings/security-tips-card.css";

const SecurityTipsCard = () => {
  return (
    <div className="security-tips-card">
      <div className="security-tips-header">
        <FaShieldAlt />

        <h3>Security Tips</h3>
      </div>

      <ul className="security-tips-list">
        <li>
          <FaLock />
          Use at least 8 characters in your password
        </li>

        <li>
          <FaKey />
          Include uppercase, lowercase, numbers, and sysmbols
        </li>

        <li>
          <FaUserShield />
          Update your password regularly for better security
        </li>

        <li>
          <FaUserShield />
          Avoid reusing passwords across multiple accounts
        </li>
        
      </ul>
    </div>
  );
};

export default SecurityTipsCard;
