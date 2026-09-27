import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist-topnav",
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: "esbuild",
    lib: {
      entry: fileURLToPath(new URL("./src/topnav-main.tsx", import.meta.url)),
      name: "MSReactBitsRubberTopNav",
      formats: ["iife"],
      fileName: () => "rubber-segment-topnav.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "rubber-segment-topnav.css"
            : "[name][extname]",
      },
    },
  },
});
