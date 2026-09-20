import * as React from "react";
import { createRoot, type Root } from "react-dom/client";
import BorderGlow from "@/components/BorderGlow";
import "@/index.css";

type MountedCard = {
  root: Root;
  host: HTMLElement;
};

const mounted = new Map<HTMLElement, MountedCard>();

function mountBorderGlowCards() {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>("#msServicesDeck .ms3d-card")
  );

  for (const card of cards) {
    if (mounted.has(card) || card.dataset.reactBitsBorderGlow === "1") continue;

    const originalInner = card.querySelector<HTMLElement>(":scope > .ms3d-inner");
    if (!originalInner) continue;

    const originalHtml = originalInner.innerHTML;
    originalInner.remove();

    card.dataset.reactBitsBorderGlow = "1";
    card.classList.add("ms-react-bits-border-glow-card");

    const host = document.createElement("div");
    host.className = "ms-react-bits-border-glow-host";
    card.appendChild(host);

    const root = createRoot(host);
    root.render(
      <BorderGlow
        className="ms-react-bits-border-glow"
        edgeSensitivity={28}
        glowColor="48 90 86"
        backgroundColor="rgba(7, 12, 20, 0.28)"
        borderRadius={22}
        glowRadius={38}
        glowIntensity={0.82}
        coneSpread={24}
        colors={["#f6f1d9", "#4169e1", "#c9ff36"]}
        fillOpacity={0.18}
      >
        <div
          className="ms3d-inner"
          dangerouslySetInnerHTML={{ __html: originalHtml }}
        />
      </BorderGlow>
    );

    mounted.set(card, { root, host });
  }
}

function boot() {
  mountBorderGlowCards();

  const observer = new MutationObserver(() => mountBorderGlowCards());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener(
    "pagehide",
    () => {
      observer.disconnect();
      for (const { root } of mounted.values()) root.unmount();
      mounted.clear();
    },
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
