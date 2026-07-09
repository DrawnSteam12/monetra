import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "../../../../assets/css/features/settings/password-requirments.css";
type PasswordRequirementsProps = {
  password: string;
};

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const requirements = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
    },
  ];

  return (
    <div className="password-requirements">
      <h4>Password Requirements</h4>

      <ul>
        {requirements.map((requirement) => (
          <li
            key={requirement.label}
            className={
              requirement.valid ? "requirement-valid" : "requirement-invalid"
            }
          >
            {requirement.valid ? <FaCheckCircle /> : <FaTimesCircle />}

            <span>{requirement.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
