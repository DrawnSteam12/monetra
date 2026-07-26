import { createContext, useContext, useState, useEffect } from "react";
import API_BASE_URL from "../../../api/apiClient";

import type { ReactNode } from "react";

type User = {
  id: string;

  fullName: string;

  email: string;
};

type AuthContextType = {
  user: User | null;

  loading: boolean;

  login: (email: string, password: string) => Promise<boolean>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("monetra-token");
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          if (response.status === 401) {
            logout();
          } else {
            console.error(
              `Authentication verification failed (${response.status}). Server may be unavailable.`,
            );
          }
          setLoading(false);

          return;
        }

        const storedUser = localStorage.getItem("monetra-user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error(error);
        console.error("Authentication check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }
      setUser(data.user);

      localStorage.setItem("monetra-user", JSON.stringify(data.user));

      localStorage.setItem("monetra-token", data.token);

      return true;
    } catch (error) {
      console.error("Login failed:", error);

      throw error instanceof Error
        ? error
        : new Error("Server connection failed");
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("monetra-user");

    localStorage.removeItem("monetra-token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
