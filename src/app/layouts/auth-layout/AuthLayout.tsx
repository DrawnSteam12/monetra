import type { ReactNode } from "react";

import "../../../assets/css/layouts/auth-layout.css";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="auth-layout">
      <section className="auth-container">
        <div className="auth-left">
          <h1 className="auth-logo">Monetra</h1>

          <h2 className="auth-title">Smart Expense Tracking</h2>

          <p className="auth-subtitle">
            Track expenses, monitor budgets, and understand your finances
            better.
          </p>
        </div>

        <div className="auth-right">{children}</div>
      </section>
    </main>
  );
};

export default AuthLayout;
