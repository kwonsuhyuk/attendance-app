import { SidebarMenu } from "@/components/ui/sidebar";
import { MENU_STRUCTURE } from "@/constants/menuConfig";
import ManagerMenuBarItem from "./ManagerMenuBarItem";

const AdminMenuList = () => {
  return (
    <SidebarMenu>
      {MENU_STRUCTURE.map(section => (
        <ManagerMenuBarItem key={section.label} section={section} />
      ))}
    </SidebarMenu>
  );
};

export default AdminMenuList;
