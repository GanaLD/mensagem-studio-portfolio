import * as React from "react";
import { createRoot } from "react-dom/client";
import { ShaderBackground } from "@/components/ui/shader-background";
import "@/index.css";

const layer = document.querySelector<HTMLElement>(".projects-shader");

if (layer && layer.dataset.shader21stMounted !== "1") {
  layer.dataset.shader21stMounted = "1";
  layer.classList.add("shader-21st-active");

  layer.querySelectorAll(".projects-aurora-canvas,.projects-heated-canvas").forEach((node) => node.remove());

  const host = document.createElement("div");
  host.id = "projects-21st-shader-root";
  host.setAttribute("aria-hidden", "true");
  layer.prepend(host);

  const root = createRoot(host);
  root.render(
    <ShaderBackground className="projects-21st-shader-canvas" />
  );

  window.addEventListener("pagehide", () => root.unmount(), { once: true });
}
