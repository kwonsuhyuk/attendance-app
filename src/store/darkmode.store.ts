import { create } from "zustand";

interface IDarkModeStore {
  darkMode: boolean;
  toggleMode: () => void;
  initializeMode: () => void;
}

const getInitialMode = (): boolean => {
  const savedMode = localStorage.getItem("darkMode");
  if (!savedMode) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return JSON.parse(savedMode);
};

const useDarkMode = create<IDarkModeStore>(set => ({
  darkMode: getInitialMode(),

  toggleMode: () =>
    set(state => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
      return { darkMode: newMode };
    }),

  initializeMode: () => {
    const savedMode = getInitialMode();
    document.documentElement.setAttribute("data-theme", savedMode ? "dark" : "light");
    set({ darkMode: savedMode });
  },
}));

export default useDarkMode;
