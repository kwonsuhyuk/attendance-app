import { ManagerMenuBar } from "./ManagerMenuBar";
import { EmployeeMenuBar } from "./EmployeeMenuBar";
import { useMenuBar } from "@/hooks/menu/useMenuBar";

const MenuBar = () => {
  const menuBar = useMenuBar();
  const { userType, ...menuState } = menuBar;

  if (userType === "manager") {
    return <ManagerMenuBar {...menuState} />;
  } else {
    return <EmployeeMenuBar {...menuState} />;
  }
};

export default MenuBar;
