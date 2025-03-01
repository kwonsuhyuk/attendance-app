import { ManagerMenuBar } from "./ManagerMenuBar";
import { EmployeeMenuBar } from "./EmployeeMenuBar";
import { useMenuBar } from "@/hooks/menu/useMenuBar";

const MenuBar = () => {
  const { userType, ...menuState } = useMenuBar();

  if (userType === "manager") {
    return <ManagerMenuBar />;
  } else {
    return <EmployeeMenuBar {...menuState} />;
  }
};

export default MenuBar;
