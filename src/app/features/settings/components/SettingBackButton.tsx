import { useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

const SettingsBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="settings-back-button"
      onClick={() => navigate("/settings")}
    >
      <FaArrowLeft />
      <span>Back to Settings</span>
    </button>
  );
};

export default SettingsBackButton;
