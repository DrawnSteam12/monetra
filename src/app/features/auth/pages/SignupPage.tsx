import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../../context/theme-context/ThemeContext";
import monetraLogoLight from "../../../../assets/branding/monetra-logo-light.png";
import monetraLogoDark from "../../../../assets/branding/monetra-logo-dark.png";
import AuthLayout from "../../../layouts/auth-layout/AuthLayout";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import "../../../../assets/css/features/auth/login-page.css";
import { registerUser } from "../../../services/auth.service";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { appliedTheme } = useTheme();

  const logo = appliedTheme === "dark" ? monetraLogoDark : monetraLogoLight;

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");

      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");

      return;
    }

    try {
      setLoading(true);
      await registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login", {
        state: {
          successMessage: "Account created successfully! Please sign in.",
        },
      });
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
            onChange={(event) => {
              setError("");

              setFormData({
                ...formData,
                fullName: event.target.value,
              });
            }}
          />

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
            autoComplete="new-password"
            value={formData.password}
            onChange={(event) => {
              setError("");

              setFormData({
                ...formData,
                password: event.target.value,
              });
            }}
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={(event) => {
              setError("");

              setFormData({
                ...formData,
                confirmPassword: event.target.value,
              });
            }}
          />
          {error && <p className="auth-error">{error}</p>}
          <AuthButton
            text={loading ? "Creating account..." : "Create Account"}
            type="submit"
            disabled={
              loading ||
              !formData.fullName ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
          />
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
