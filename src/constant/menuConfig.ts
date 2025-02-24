export interface MenuButtonConfig {
  label: string;
  path: string;
  tourStep?: string;
}

export const ADMIN_MENU_BUTTONS: MenuButtonConfig[] = [
  { label: "HOME", path: "/companymain" },
  { label: "PEOPLE", path: "/employeelist", tourStep: "step-3" },
  { label: "CALENDAR", path: "/datecheck" },
  { label: "SETTING", path: "/setting", tourStep: "step-18" },
  { label: "ABOUT", path: "/about" },
];
