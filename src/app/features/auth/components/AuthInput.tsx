import { useState } from "react";

import {
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

type AuthInputProps = {
  label: string;

  type: string;

  placeholder: string;

  autoComplete?: string;

  value: string;

  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

const AuthInput = ({
  label,
  type,
  placeholder,
  autoComplete = "off",
  value,
  onChange,
}: AuthInputProps) => {
  const [
    showPassword,

    setShowPassword,
  ] =
    useState(false);

  const isPassword =
    type ===
    "password";

  return (
    <div className="login-input-group">
      <label>
        {label}
      </label>

      <div className="password-input-wrapper">
        <input
          type={
            isPassword &&
            showPassword
              ? "text"
              : type
          }

          placeholder={
            placeholder
          }

          autoComplete={
            autoComplete
          }

          value={value}

          onChange={
            onChange
          }
        />

        {isPassword && (
          <button
            type="button"

            className="password-toggle"

            onClick={() =>
              setShowPassword(
                (
                  previous,
                ) =>
                  !previous,
              )
            }
          >
            {showPassword ? (
              <HiOutlineEyeOff />
            ) : (
              <HiOutlineEye />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;

