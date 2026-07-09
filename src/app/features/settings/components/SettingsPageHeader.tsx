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
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SettingsPageHeader;
