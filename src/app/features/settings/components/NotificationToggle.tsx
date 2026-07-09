import type { ReactNode } from "react";

import "../../../../assets/css/features/settings/notification-toggle.css";

type NotificationToggleProps = {
  icon: ReactNode;

  title: string;

  description: string;

  enabled: boolean;

  onToggle: () => void;
};

const NotificationToggle = ({
  icon,
  title,
  description,
  enabled,
  onToggle,
}: NotificationToggleProps) => {
  return (
    <div className="notification-toggle">
      <div className="notification-toggle-info">
        <div className="notification-toggle-title">
          <span className="notification-icon">{icon}</span>

          <h4>{title}</h4>
        </div>

        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`notification-switch ${enabled ? "enabled" : ""}`}
        onClick={onToggle}
      >
        <span className="notification-switch-thumb" />
      </button>
    </div>
  );
};

export default NotificationToggle;
