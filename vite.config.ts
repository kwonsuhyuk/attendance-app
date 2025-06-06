import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

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
  plugins: [
    react(),
    visualizer({
      filename: "bundle-report.html", // 생성될 보고서 파일 이름
      open: true, // 빌드 후 브라우저 자동 열기
      gzipSize: true, // gzip 크기도 표시
      brotliSize: true, // brotli 크기도 표시
    }),
  ],
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          chart: ["recharts"],
          firebase: ["firebase/app", "firebase/database"],
        },
      },
    },
  },
});
