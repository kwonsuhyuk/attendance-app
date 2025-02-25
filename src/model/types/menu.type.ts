// 메뉴바 아이템 타입
export type TMenuItem = {
  title: string;
  handle: () => void;
};

// 메뉴 아이템 그룹 타입
export type TMenuItemGroup = {
  menuItems: TMenuItem[];
  middleMenuItems: TMenuItem[];
  subMenuItems: TMenuItem[];
};
