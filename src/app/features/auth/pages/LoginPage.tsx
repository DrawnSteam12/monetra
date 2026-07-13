import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const successMessage = location.state?.successMessage;
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate(location.pathname, {
          replace: true,
          state: {},
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, location.pathname]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");

      return;
    }

    try {
      setLoading(true);

      const success = await login(formData.email, formData.password);

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
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
        {successMessage && <p className="auth-success">{successMessage}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) => {
              setError("");

              setFormData({
                ...formData,
                email: event.target.value,
              });
            }}
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(event) => {
              setError("");

              setFormData({
                ...formData,
                password: event.target.value,
              });
            }}
          />
          {error && <p className="auth-error">{error}</p>}
          <AuthButton
            text={loading ? "Logging in..." : "Login"}
            type="submit"
            disabled={loading}
          />
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
