import SettingsBackButton from "./SettingBackButton";
import "../../../../assets/css/features/settings/settings-page-header.css";
type SettingsPageHeaderProps = {
  title: string;
  description: string;
};

const SettingsPageHeader = ({
  title,
  description,
}: SettingsPageHeaderProps) => {
  return (
    <div className="settings-page-header">
      <SettingsBackButton />

      <div>
        <h1 className="settings-title">{title}</h1>
        <p className="settings-subtitle">{description}</p>
      </div>
    </div>
  );
};

export default SettingsPageHeader;
