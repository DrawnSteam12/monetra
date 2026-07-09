import type {
  SecurityFormData,
  SecurityFormErrors,
} from "../types/security-settings.type";

export const validatePasswordForm = (
  formData: SecurityFormData,
): SecurityFormErrors => {
  const errors: SecurityFormErrors = {};

  if (!formData.currentPassword.trim()) {
    errors.currentPassword = "Current password is required";
  }
  if (!formData.newPassword.trim()) {
    errors.newPassword = "New password is required";
  } else if (formData.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  } else if (formData.currentPassword === formData.newPassword) {
    errors.newPassword = "New password must be different from current password";
  }
  if (!formData.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};
