import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL("./main.tsx", import.meta.url)),
      name: "MSPreviewFilter",
      formats: ["es"],
      fileName: () => "filter-token-react.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "filter-token-react.css"
            : "[name][extname]",
      },
    },
  },
});
