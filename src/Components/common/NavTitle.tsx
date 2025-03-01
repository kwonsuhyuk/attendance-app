import React from "react";
import { useLocation } from "react-router-dom";

import { LucideProps } from "lucide-react";
import { MENU_STRUCTURE } from "@/constants/menuConfig";

interface MenuItem {
  label: string;
  path: string;
  icon?: React.FC<LucideProps>;
  highlight?: boolean;
  dotColor?: string;
  children?: MenuItem[];
}

const NavTitle = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const findTitle = (menu: MenuItem[], path: string): string | null => {
    for (const item of menu) {
      if (item.path === path) return item.label;
      if (item.children) {
        const found = findTitle(item.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  const normalizedPath = currentPath.replace(/^\/[^/]+(\/[^/]+)?/, "$1") || "/";
  const title = findTitle(MENU_STRUCTURE as MenuItem[], normalizedPath);

  return <div className="text-lg font-bold text-dark-text">{title || "페이지 없음"}</div>;
};

export default NavTitle;
