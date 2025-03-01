import { useLocation } from "react-router-dom";
import { useMenuState } from "./useMenuState";
import { useMenuActions } from "./useMenuActions";
import { useMenuItems } from "./useMenuItems";

export const useMenuBar = () => {
  const location = useLocation();
  const menuState = useMenuState();
  const menuActions = useMenuActions();
  const menuItems = useMenuItems(menuState.companyCode, menuActions.logout);

  return {
    ...menuState,
    ...menuActions,
    ...menuItems,
    location,
  };
};
