import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "",
  server: {
    proxy: {
      "/api": "http://10.0.1.24:3000", 
      "/auth": {
        target: "http://10.0.1.24:3000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": "http://10.0.1.24:3000",
    },
  },
});
