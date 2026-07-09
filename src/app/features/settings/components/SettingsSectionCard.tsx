import type { ReactNode } from "react";

import "../../../../assets/css/features/settings/settings-section-card.css";

type SettingsSectionCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const SettingsSectionCard = ({
  title,
  description,
  children,
}: SettingsSectionCardProps) => {
  return (
    <section className="settings-section-card">
      <div className="settings-section-header">
        <h2>{title}</h2>

        <p>{description}</p>
      </div>

      <div className="settings-section-content">{children}</div>
    </section>
  );
};

export default SettingsSectionCard;
