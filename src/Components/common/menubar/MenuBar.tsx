import EmployeeMenuBar from "./EmployeeMenuBar";
import { ManagerMenuBar } from "./ManagerMenuBar";
import { useMenuBar } from "@/hooks/menu/useMenuBar";

const MenuBar = () => {
  const { userType } = useMenuBar();

  return userType === "manager" ? <ManagerMenuBar /> : <EmployeeMenuBar />;
};

export default MenuBar;
