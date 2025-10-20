import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    minify: "esbuild",
    target: "esnext",

    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          state: ["@reduxjs/toolkit", "react-redux"],
          router: ["react-router-dom"],
        },
      },
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
