/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // darkmode
        "dark-bg": "#202020",
        "dark-text": "#FFFFFF",
        "dark-border": "#FFFFFF80",
        "dark-border-sub": "#FFFFFF33",
        "dark-nav-text": "#909090",
        "dark-nav-selected": "#FFFFFF",
        // whitemode
        "white-bg": "#EEEEEE",
        "white-text": "#000000",
        "white-border": "#00000080",
        "white-border-sub": "#00000033",
        "white-nav-text": "#6F6F6F",
        "white-nav-selected": "#000000",
      },
      fontFamily: {
        title: [], // 제목 폰트 설정
        content: [], // 내용 폰트 설정
      },
    },
  },
  darkMode: "class",
  plugins: [],
  important: true,
};

{
  /* <div class="bg-white dark:bg-black text-black dark:text-white">
   기본 모드에서는 흰색 배경에 검은색 텍스트이고 다크 모드에서는 검은색 배경에 흰색 텍스트
</div> */
}
