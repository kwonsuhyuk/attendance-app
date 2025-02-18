import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useDarkMode from "@/store/darkmode.store";

// ThemeProvider의 props 타입 정의
interface ThemeProviderProps extends PropsWithChildren {
  excludePaths: string[];
}

export default function ThemeProvider({ children, excludePaths = [] }: ThemeProviderProps) {
  const { darkMode, initializeMode } = useDarkMode();
  const location = useLocation();

  const isExcluded = excludePaths.some((path: string) => location.pathname === path);

  useEffect(() => {
    if (!isExcluded) {
      initializeMode();
    }
  }, [initializeMode, isExcluded]);

  useEffect(() => {
    if (!isExcluded) {
      document.documentElement.classList.toggle("dark", darkMode);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, isExcluded]);

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {children}
    </div>
  );
}
