import * as React from "react";
import { createRoot } from "react-dom/client";
import PortfolioFilterBar from "@/portfolio-filter";
import "@/styles/globals.css";

const host = document.getElementById("filters");

if (host) {
  host.innerHTML = "";
  host.className = "";
  host.dataset.reactFilterMounted = "1";

  const root = createRoot(host);
  root.render(
    <React.StrictMode>
      <PortfolioFilterBar />
    </React.StrictMode>
  );

  window.addEventListener(
    "pagehide",
    () => {
      root.unmount();
    },
    { once: true }
  );
}
