import { useState } from "react";
import type { BudgetAlertErrors } from "../types/budget-alert-errors.type";
import { validateBudgetAlertSettings } from "../utils/budget-alert-validation";
import type { BudgetAlertSettings } from "../types/budget-alert-settings.type";
import { defaultBudgetAlertSettings } from "../utils/default-budget-alert-settings";
import "../../../../assets/css/features/settings/budget-alert-form.css";
import {
  getSettings,
  updateSettings,
} from "../../../services/settings.service";

type BudgetAlertFormProps = {
  settings: BudgetAlertSettings;

  setSettings: React.Dispatch<React.SetStateAction<BudgetAlertSettings>>;
};

const BudgetAlertForm = ({ settings, setSettings }: BudgetAlertFormProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (Number(value) < 0) return;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const [errors, setErrors] = useState<BudgetAlertErrors>({});

  const [successMessage, setSuccessMessage] = useState("");

  const [isFading, setIsFading] = useState(false);

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsFading(false);

    setTimeout(() => {
      setIsFading(true);

      setTimeout(() => {
        setSuccessMessage("");
        setIsFading(false);
      }, 300);
    }, 2700);
  };

  const handleSave = async () => {
    const validationErrors = validateBudgetAlertSettings(settings);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      setIsFading(false);
      return;
    }

    const budgetSettings = {
      monthlyBudget: Number(settings.monthlyBudget),
      warningThreshold: Number(settings.warningThreshold),
      criticalThreshold: Number(settings.criticalThreshold),
    };

    try {
      const currentSettings = await getSettings();

      await updateSettings({
        ...currentSettings,
        ...budgetSettings,
      });

      showSuccessMessage("Budget settings saved successfully!");
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      const currentSettings = await getSettings();

      await updateSettings({
        ...currentSettings,
        monthlyBudget: 0,
        warningThreshold: 70,
        criticalThreshold: 90,
      });

      setSettings(defaultBudgetAlertSettings);

      setErrors({});
      showSuccessMessage("Budget settings reset successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="budget-alert-form">
      <div className="budget-alert-group">
        <label>Monthly Budget</label>

        <input
          type="number"
          placeholder="Enter monthly budget"
          name="monthlyBudget"
          value={settings.monthlyBudget}
          onChange={handleChange}
        />

        {errors.monthlyBudget && (
          <span className="budget-alert-error">{errors.monthlyBudget}</span>
        )}
      </div>

      <div className="budget-alert-group">
        <label>Warning Threshold (%)</label>

        <input
          type="number"
          name="warningThreshold"
          value={settings.warningThreshold}
          onChange={handleChange}
          min="1"
          max="100"
        />

        {errors.warningThreshold && (
          <span className="budget-alert-error">{errors.warningThreshold}</span>
        )}
      </div>

      <div className="budget-alert-group">
        <label>Critical Threshold</label>

        <input
          type="number"
          name="criticalThreshold"
          value={settings.criticalThreshold}
          onChange={handleChange}
          min="1"
          max="100"
        />

        {errors.criticalThreshold && (
          <span className="budget-alert-error">{errors.criticalThreshold}</span>
        )}
      </div>

      {successMessage && (
        <div className={`budget-alert-success ${isFading ? "fade-out" : ""}`}>
          {successMessage}
        </div>
      )}

      <button
        type="button"
        className="budget-alert-save-button"
        onClick={handleSave}
      >
        Save Budget Settings
      </button>

      <button
        type="button"
        className="budget-alert-reset-button"
        onClick={handleReset}
      >
        Reset to Default
      </button>
    </div>
  );
};

export default BudgetAlertForm;
