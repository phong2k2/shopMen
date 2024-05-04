import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// export default defineConfig({
//   define: {
//     "process.env": process.env,
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//   },
//   plugins: [react()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@use "./src/assets/styles/index.scss" as global;`,
//       },
//     },
//   },
// });

export default defineConfig(({ command }) => {
  const env = dotenv.config({
    path: command === "build" ? ".env.production" : ".env.development",
  }).parsed;

  return {
    define: {
      "process.env": Object.keys(env).reduce((prev, key) => {
        prev[key] = env[key];
        return prev;
      }, {}),
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
