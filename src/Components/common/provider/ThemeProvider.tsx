import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useDarkMode from "@/store/darkmode.store";
import { useShallow } from "zustand/shallow";

// ThemeProvider의 props 타입 정의
interface IThemeProviderProps extends PropsWithChildren {
  excludePaths: string[];
}

export default function ThemeProvider({ children, excludePaths = [] }: IThemeProviderProps) {
  const { darkMode, initializeMode } = useDarkMode(
    useShallow(state => ({
      darkMode: state.darkMode,
      initializeMode: state.initializeMode,
    })),
  );
  const location = useLocation();

  const isExcluded = excludePaths.some((path: string) => location.pathname === path);

  useEffect(() => {
    initializeMode();
  }, [initializeMode]);

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
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:text-white">
      {children}
    </div>
  );
}
