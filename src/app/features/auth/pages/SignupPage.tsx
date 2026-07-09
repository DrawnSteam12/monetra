import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useTheme } from "../../../context/theme-context/ThemeContext";

import monetraLogoLight from "../../../../assets/branding/monetra-logo-light.png";

import monetraLogoDark from "../../../../assets/branding/monetra-logo-dark.png";

import AuthLayout from "../../../layouts/auth-layout/AuthLayout";

import AuthInput from "../components/AuthInput";

import AuthButton from "../components/AuthButton";

import "../../../../assets/css/features/auth/login-page.css";
const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { appliedTheme } = useTheme();

  const logo = appliedTheme === "dark" ? monetraLogoDark : monetraLogoLight;

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");

      return;
    }

    console.log("Account created:", formData.email);
    navigate("/login");
  };

  return (
    <AuthLayout>
      <section className="login-form-container">
        <div className="login-header">
          <img src={logo} alt="Monetra Logo" className="login-logo" />
          <h1 className="login-title">Create Account</h1>

          <p className="login-subtitle">
            Create your Monetra account to start tracking finances
          </p>
        </div>

        <form className="login-form" onSubmit={handleSignup}>
          <AuthInput
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            autoComplete="name"
            value={formData.fullName}
            onChange={(event) =>
              setFormData({
                ...formData,
                fullName: event.target.value,
              })
            }
          />

          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) =>
              setFormData({
                ...formData,
                email: event.target.value,
              })
            }
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(event) =>
              setFormData({
                ...formData,
                password: event.target.value,
              })
            }
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(event) =>
              setFormData({
                ...formData,
                confirmPassword: event.target.value,
              })
            }
          />

          <AuthButton text="Create Account" type="submit" />
        </form>

        <div className="login-footer">
          <p>Already have an account?</p>

          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </section>
    </AuthLayout>
  );
};

export default SignupPage;
