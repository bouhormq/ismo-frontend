import { sentryVitePlugin } from "@sentry/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on
    },
    plugins: [
      react(),
      tsconfigPaths(),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: "poyesis",
        project: "ismo-frontend",
      }),
    ],
    server: {
      port: 3000,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    root: ".",
    // resolve: {
    //   alias: {
    //     "$/": path.resolve(__dirname, "src"),
    //   },
    // },
    esbuild: {
      drop: ["debugger"],
      pure: ["console.log"],
    },
  };
});
