export type SecurityFormData = {
  currentPassword: string;

  newPassword: string;

  confirmPassword: string;
};

export type SecurityFormErrors = {
  currentPassword?: string;

  newPassword?: string;

  confirmPassword?: string;
};
