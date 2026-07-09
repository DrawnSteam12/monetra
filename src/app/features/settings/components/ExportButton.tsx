import "../../../../assets/css/features/settings/export-button.css";

import { FaSpinner } from "react-icons/fa";

type ExportButtonProps = {
  label: string;

  onClick: () => void;

  icon: React.ReactNode;

  disabled?: boolean;

  loading?: boolean;
};

const ExportButton = ({
  label,
  onClick,
  icon,
  disabled = false,
  loading = false,
}: ExportButtonProps) => {
  return (
    <button
      type="button"
      className="export-button"
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className="export-button-icon">
        {loading ? <FaSpinner className="export-button-spinner" /> : icon}
      </span>

      <span>{loading ? "Exporting..." : label}</span>
    </button>
  );
};

export default ExportButton;
