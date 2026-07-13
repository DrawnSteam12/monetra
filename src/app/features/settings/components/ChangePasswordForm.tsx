import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import PasswordRequirements from "./PasswordRequirements";
import type {
  SecurityFormData,
  SecurityFormErrors,
} from "../types/security-settings.type";
import { validatePasswordForm } from "../utils/password-validation";
import { getPasswordStrength } from "../utils/password-strength";
import PasswordStrength from "./PasswordStrength";
import { changePassword } from "../../../services/user.service";
import "../../../../assets/css/features/settings/change-password-form.css";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState<SecurityFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<SecurityFormErrors>({});

  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSuccessMessage("");

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,

      [name]: undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setSuccessMessage("");

    const validationErrors = validatePasswordForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (Object.keys(validatePasswordForm).length > 0) {
      return;
    }
    try {
      setLoading(true);

      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setSuccessMessage("Password updated successfully");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error) {
      if (error instanceof Error) {
        setErrors({
          currentPassword: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="change-password-form" onSubmit={handleSubmit}>
      <div className="password-group">
        <label>Current Password</label>
        <div className="password-input-wrapper">
          <FaLock />

          <input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
          />
          {formData.currentPassword && (
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>

        {errors.currentPassword && (
          <span className="password-error">{errors.currentPassword}</span>
        )}
      </div>

      <div className="password-group">
        <label>New Password</label>

        <div className="password-input-wrapper">
          <FaLock />

          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            autoComplete="new-password"
          />

          {formData.newPassword && (
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>

        {formData.newPassword && (
          <PasswordStrength strength={passwordStrength} />
        )}
        {formData.newPassword && (
          <PasswordRequirements password={formData.newPassword} />
        )}
        {errors.newPassword && (
          <span className="password-error">{errors.newPassword}</span>
        )}
      </div>

      <div className="password-group">
        <label>Confirm Password</label>

        <div className="password-input-wrapper">
          <FaLock />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            autoComplete="new-password"
          />

          {formData.confirmPassword && (
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>

        {errors.confirmPassword && (
          <span className="password-error">{errors.confirmPassword}</span>
        )}
      </div>

      {successMessage && (
        <div className="password-success">{successMessage}</div>
      )}

      <button
        type="submit"
        className="change-password-button"
        disabled={
          loading ||
          !formData.currentPassword ||
          !formData.newPassword ||
          !formData.confirmPassword
        }
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
