import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command }) =>
  command === "serve"
    ? {
        plugins: [react()],
        server: {
          watch: {
            usePolling: true,
          },
          host: true,
          port: 3000,
          strictPort: true,
        },
      }
    : {
        plugins: [react()],
        build: {
          outDir: "build",
        },
      },
);
