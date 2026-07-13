import { createContext, useContext, useEffect, useState } from "react";
import { getSettings, updateTheme } from "../../services/settings.service";
import type { ReactNode } from "react";

type Theme = "light" | "dark" | "system";

type AppliedTheme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;

  appliedTheme: AppliedTheme;

  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("monetra-theme") as Theme | null) ?? "system";
  });

  const [appliedTheme, setAppliedTheme] = useState<AppliedTheme>("light");

  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);

    try {
      await updateTheme(newTheme);
    } catch (error) {
      console.error("Failed to save theme", error);
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const settings = await getSettings();

        setThemeState(settings.theme ?? "system");
      } catch {
        const storedTheme = localStorage.getItem(
          "monetra-theme",
        ) as Theme | null;

        if (storedTheme) {
          setThemeState(storedTheme);
        }
      }
      setIsThemeLoaded(true);
    };
    loadTheme();
  }, []);

  useEffect(() => {
    if (!isThemeLoaded) {
      return;
    }

    const root = document.documentElement;

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const resolvedTheme = theme === "system" ? systemTheme : theme;

    setAppliedTheme(resolvedTheme);

    root.setAttribute("data-theme", resolvedTheme);
    localStorage.setItem("monetra-theme", theme);
  }, [theme, isThemeLoaded]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        appliedTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
