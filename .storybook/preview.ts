import "../src/index.css";
import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";

// ✅ Storybook 글로벌 설정
export const parameters: Preview["parameters"] = {
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#09090B" },
    ],
  },
  darkMode: {
    current: "light",
    dark: themes.dark, // ✅ Storybook의 Dark Mode 테마 적용
    light: themes.light, // ✅ Storybook의 Light Mode 테마 적용
    stylePreview: true, // ✅ 미리보기에서 다크 모드 적용
  },
  actions: {
    handles: ["onClick", "onSubmit", "onChange"],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

// ✅ Storybook에서 Tailwind 다크 모드 자동 적용
export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light", // Tailwind 기본 라이트 모드
      dark: "dark", // Tailwind 다크 모드
    },
    defaultTheme: "light",
  }),
];
