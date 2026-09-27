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
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: "esbuild",
    lib: {
      entry: fileURLToPath(new URL("./src/main.tsx", import.meta.url)),
      name: "MSReactBitsBorderGlow",
      formats: ["es"],
      fileName: () => "border-glow-service-cards.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "border-glow-service-cards.css"
            : "[name][extname]",
      },
    },
  },
});
