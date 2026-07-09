import { FaChevronRight } from "react-icons/fa";

import "../../../../assets/css/features/settings/settings-navigation-card.css";

import type { ReactNode } from "react";

type SettingsNavigationCardProps = {
  icon: ReactNode;

  title: string;

  description: string;

  onClick: () => void;
};

const SettingsNavigationCard = ({
  icon,
  title,
  description,
  onClick,
}: SettingsNavigationCardProps) => {
  return (
    <button className="settings-navigation-card" onClick={onClick}>
      <div className="settings-navigation-left">
        <div className="settings-navigation-icon">{icon}</div>

        <div>
          <h3>{title}</h3>

          <p>{description}</p>
        </div>
      </div>

      <FaChevronRight />
    </button>
  );
};

export default SettingsNavigationCard;
