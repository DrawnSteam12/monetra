export const deleteAccountData = () => {
  localStorage.removeItem("monetra-transactions");

  localStorage.removeItem("monetra-budget-alerts");

  localStorage.removeItem("monetra-notifications");

  localStorage.removeItem("monetra-general-settings");

  localStorage.removeItem("theme");
};
