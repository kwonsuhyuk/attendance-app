export const PAGE_TITLE_MAP = {
  companymain: "HOME",
  calendar: "CALENDAR",
  camera: "CAMERA",
  appguide: "GUIDE",
} as const;

export const BUTTON_STYLES = {
  main: {
    buttonClassName: "w-full justify-start gap-5 h-12",
    textClassName: "font-semibold text-lg",
  },
  middle: {
    buttonClassName: "w-full justify-start gap-5 h-12",
  },
  sub: {
    buttonClassName: "gap-1 h-auto hover:bg-transparent",
    textClassName: "text-sm font-noto",
  },
} as const;
