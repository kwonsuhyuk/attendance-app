import { TMenuItem } from "@/model/types/menu.type";
import { BUTTON_STYLES, PAGE_TITLE_MAP } from "@/constants/menuButton";

export const getPageTitle = (pathname: string): string => {
  const path = Object.keys(PAGE_TITLE_MAP).find(key => pathname.includes(key));
  return path ? PAGE_TITLE_MAP[path as keyof typeof PAGE_TITLE_MAP] : "MENU";
};

export const mapButtonWithStyle = (items: TMenuItem[], style: keyof typeof BUTTON_STYLES) => {
  return items.map(item => ({
    ...item,
    ...BUTTON_STYLES[style],
  }));
};
