import { PropsWithChildren, useEffect } from "react";
import useDarkMode from "@/store/darkmode.store";

export default function ThemeProvider({ children }: PropsWithChildren) {
  const { darkMode, initializeMode } = useDarkMode();

  useEffect(() => {
    initializeMode();

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, initializeMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {children}
    </div>
  );
}
