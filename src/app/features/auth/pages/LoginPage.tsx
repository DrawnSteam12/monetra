import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth-context/AuthContext";

import "../../../../assets/css/features/auth/login-page.css";

import AuthLayout from "../../../layouts/auth-layout/AuthLayout";

import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

import { useTheme } from "../../../context/theme-context/ThemeContext";

import monetraLogoLight from "../../../../assets/branding/monetra-logo-light.png";

import monetraLogoDark from "../../../../assets/branding/monetra-logo-dark.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { appliedTheme } = useTheme();

  const logo = appliedTheme === "dark" ? monetraLogoDark : monetraLogoLight;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");

      return;
    }

    const success = await login(formData.email, formData.password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout>
      <section className="login-form-container">
        <div className="login-header">
          <img src={logo} alt="Monetra Logo" className="login-logo" />
          <h1 className="login-title">Welcome Back</h1>

          <p className="login-subtitle">Sign in to continue using Monetra</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
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
            autoComplete="current-password"
            value={formData.password}
            onChange={(event) =>
              setFormData({
                ...formData,
                password: event.target.value,
              })
            }
          />

          <AuthButton text="Login" type="submit" />
        </form>

        <div className="login-footer">
          <p>Don't have an account?</p>

          <button type="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </section>
    </AuthLayout>
  );
};

export default LoginPage;
