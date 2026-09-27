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
    outDir: "dist-rubber",
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: "esbuild",
    lib: {
      entry: fileURLToPath(new URL("./src/rubber-main.tsx", import.meta.url)),
      name: "MSReactBitsRubberSegment",
      formats: ["iife"],
      fileName: () => "rubber-segment-services.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "rubber-segment-services.css"
            : "[name][extname]",
      },
    },
  },
});
