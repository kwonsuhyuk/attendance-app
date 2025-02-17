import { create } from "zustand";

interface DarkModeStore {
  darkMode: boolean;
  toggleMode: () => void;
  initializeMode: () => void;
}

const getInitialMode = (): boolean => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode ? JSON.parse(savedMode) : false;
};

const useDarkMode = create<DarkModeStore>(set => ({
  darkMode: getInitialMode(),

  toggleMode: () =>
    set(state => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return { darkMode: newMode };
    }),

  initializeMode: () => {
    const savedMode = getInitialMode();
    set({ darkMode: savedMode });
  },
}));

export default useDarkMode;
