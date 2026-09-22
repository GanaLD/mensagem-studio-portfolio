"use client";

import * as React from "react";

export type SurfaceTheme = "auto" | "dark" | "light";

export function useSurfaceTheme(theme: SurfaceTheme): "dark" | "light" {
  const resolve = React.useCallback((): "dark" | "light" => {
    if (theme === "dark" || theme === "light") return theme;
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (root.classList.contains("dark")) return "dark";
      if (root.classList.contains("light")) return "light";
    }
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    return "dark";
  }, [theme]);

  const [resolved, setResolved] = React.useState<"dark" | "light">(resolve);

  React.useEffect(() => {
    setResolved(resolve());
    if (theme !== "auto" || typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const update = () => setResolved(resolve());
    media.addEventListener("change", update);

    const observer =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(update)
        : null;
    observer?.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      media.removeEventListener("change", update);
      observer?.disconnect();
    };
  }, [resolve, theme]);

  return resolved;
}
