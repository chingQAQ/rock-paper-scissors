import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from '@honkhonk/vite-plugin-svgr';
import path from "path";

export default defineConfig({
  plugins: [reactRefresh(), svgr()],
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    }
  }
})
