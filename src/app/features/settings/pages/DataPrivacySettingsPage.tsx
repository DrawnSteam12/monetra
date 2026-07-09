import { useState } from "react";

import DashboardLayout from "../../dashboard/components/dashboard-layout/DashboardLayout";

import SettingsPageHeader from "../components/SettingsPageHeader";

import SettingsSectionCard from "../components/SettingsSectionCard";

import ExportButton from "../components/ExportButton";

import { exportJSON } from "../utils/export-json";

import { exportCSV } from "../utils/export-csv";

import "../../../../assets/css/features/settings/privacy-information.css";
import "../../../../assets/css/features/settings/import-placeholder.css";

import {
  FaFileCsv,
  FaFileCode,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

const DataPrivacySettingsPage = () => {
  const [isFading, setIsFading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [exportingType, setExportingType] = useState<"csv" | "json" | null>(
    null,
  );

  const handleExportJSON = async () => {
    setExportingType("json");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    exportJSON();

    setExportingType(null);

    showSuccessMessage("JSON exported successfully!");
  };

  const handleExportCSV = async () => {
    setExportingType("csv");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    exportCSV();

    setExportingType(null);

    showSuccessMessage("CSV exported successfully!");
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsFading(false);

    setTimeout(() => {
      setIsFading(true);

      setTimeout(() => {
        setSuccessMessage("");
        setIsFading(false);
      }, 500);
    }, 2500);
  };

  return (
    <DashboardLayout>
      <SettingsPageHeader
        title="Data & Privacy"
        description="Export your Monetra data and manage your privacy settings."
      />

      <SettingsSectionCard
        title="Export Your Data"
        description="Download your financial information in CSV or JSON format"
      >
        <ExportButton
          label="Export CSV"
          icon={<FaFileCsv />}
          loading={exportingType === "csv"}
          disabled={exportingType !== null}
          onClick={handleExportCSV}
        />

        <ExportButton
          label="Export JSON"
          icon={<FaFileCode />}
          loading={exportingType === "json"}
          disabled={exportingType !== null}
          onClick={handleExportJSON}
        />

        {successMessage && (
          <div className="export-success-wrapper show">
            <div className={`export-success ${isFading ? "fade-out" : ""}`}>
              {successMessage}
            </div>
          </div>
        )}
      </SettingsSectionCard>
      <SettingsSectionCard
        title="Privacy Information"
        description="Learn how Monetra stores and protects your financial information."
      >
        <div className="privacy-info-list">
          <div className="privacy-info-item">
            <FaCheckCircle className="privacy-info-icon" />

            <div>
              <strong>Local Storage</strong>

              <p>
                Your transactions and settings are stored locally in your
                browser.
              </p>
            </div>
          </div>

          <div className="privacy-info-item">
            <FaCheckCircle className="privacy-info-icon" />

            <div>
              <strong>No Cloud Synchronization</strong>

              <p>
                Monetra does not upload your financial data to external servers.
              </p>
            </div>
          </div>

          <div className="privacy-info-item">
            <FaCheckCircle className="privacy-info-icon" />

            <div>
              <strong>Export Anytime</strong>

              <p>
                You can download your information as CSV or JSON whenever you
                need.
              </p>
            </div>
          </div>

          <div className="privacy-info-item">
            <FaShieldAlt className="privacy-info-icon shield" />

            <div>
              <strong>Clear Browser Data</strong>

              <p>
                Clearing your browser storage permanently removes all locally
                stored Monetra data.
              </p>
            </div>
          </div>
        </div>
      </SettingsSectionCard>

      <SettingsSectionCard
        title="Import Data"
        description="Restore a previously exported Monetra backup."
      >
        <div className="import-placeholder">
          <button type="button" className="import-button" disabled>
            Import JSON (Coming Soon)
          </button>

          <p className="import-placeholder-text">
            Import functionality is planned for a future version of Monetra.
            Once available, you'll be able to restore your exported JSON
            backups.
          </p>
        </div>
      </SettingsSectionCard>
    </DashboardLayout>
  );
};

export default DataPrivacySettingsPage;
