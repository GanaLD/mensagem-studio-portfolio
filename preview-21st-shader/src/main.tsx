import * as React from "react";
import { createRoot } from "react-dom/client";
import Plasma from "@/components/ui/Plasma";
import "@/index.css";

const layer = document.querySelector<HTMLElement>(".projects-shader");

if (layer && layer.dataset.plasmaMounted !== "1") {
  layer.dataset.plasmaMounted = "1";
  layer.classList.add("plasma-react-bits-active");

  layer.querySelectorAll(".projects-aurora-canvas,.projects-heated-canvas,.projects-21st-shader-canvas,#projects-21st-shader-root").forEach((node) => node.remove());

  const host = document.createElement("div");
  host.id = "projects-plasma-root";
  host.setAttribute("aria-hidden", "true");
  layer.prepend(host);

  const root = createRoot(host);
  root.render(
    <Plasma
      color="#011dc4"
      speed={0.5}
      direction="forward"
      scale={1.2}
      opacity={0.8}
      mouseInteractive
      renderScale={0.55}
      maxDpr={2}
      targetFps={60}
      iterations={65}
    />
  );

  window.addEventListener("pagehide", () => root.unmount(), { once: true });
}
