import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Your backend URL — reads from .env or falls back to 127.0.0.1:5000
  const API_TARGET = env.VITE_API_TARGET || "http://127.0.0.1:5000";

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Any request to /api/* in dev gets forwarded to your backend
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
          secure: false,
          // Uncomment the line below ONLY if your backend routes don't include /api prefix
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/uploads": {
          target: API_TARGET,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
