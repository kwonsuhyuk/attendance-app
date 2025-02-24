import useDarkMode from "@/store/darkmode.store";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export const useMenuActions = () => {
  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };

  const logout = async () => {
    await signOut(getAuth());
    navigate("/");
  };

  const { toggleMode } = useDarkMode(
    useShallow(state => ({
      toggleMode: state.toggleMode,
    })),
  );

  return {
    refreshPage,
    logout,
    toggleTheme: toggleMode,
  };
};
