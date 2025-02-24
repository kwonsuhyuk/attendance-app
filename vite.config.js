import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/naver-geocode": {
        target: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/naver-geocode/, ""),
      },
    },
  },
  plugins: [react()],
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
