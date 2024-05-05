import dotenv from "dotenv";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    process.env = {
      ...process.env.development,
      ...loadEnv(mode, process.cwd()),
    };
  } else {
    process.env = {
      ...process.env.production,
      ...loadEnv(mode, process.cwd()),
    };
  }

  return {
    define: {
      "process.env": process.env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/assets/styles/index.scss" as global;`,
        },
      },
    },
  };
});

dotenv.config();
