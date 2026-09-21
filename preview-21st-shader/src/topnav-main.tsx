import * as React from "react";
import { createRoot, type Root } from "react-dom/client";
import RubberSegment from "@/components/RubberSegment";
import "@/topnav-index.css";

type NavItem = {
  value: "home" | "projetos" | "servicos" | "sobre";
  label: string;
  href: string;
};

const LABELS: Record<NavItem["value"], string> = {
  home: "Home",
  projetos: "Projetos",
  servicos: "Serviços",
  sobre: "Sobre",
};

function detectActive(): NavItem["value"] {
  const path = location.pathname.replace(/\/+$/, "/") || "/";
  if (path.includes("/servicos/")) return "servicos";
  if (path.includes("/portfolio/")) return "projetos";
  if (path.includes("/sobre/")) return "sobre";
  return "home";
}

function keyFromHref(href: string): NavItem["value"] {
  const resolved = new URL(href, location.href).pathname.toLowerCase();
  if (resolved.includes("/servicos/")) return "servicos";
  if (resolved.includes("/portfolio/")) return "projetos";
  if (resolved.includes("/sobre/")) return "sobre";
  return "home";
}

function resolveItems(nav: HTMLElement): NavItem[] {
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href]"));
  const byKey = new Map<NavItem["value"], string>();

  for (const link of links) {
    const key = keyFromHref(link.getAttribute("href") || "/");
    if (!byKey.has(key)) byKey.set(key, link.href);
  }

  const preview = location.pathname.startsWith("/wix-preview/");
  const root = preview ? "/wix-preview/" : "/";

  return (["home", "projetos", "servicos", "sobre"] as const).map((value) => {
    const fallback =
      value === "home"
        ? root
        : value === "projetos"
          ? root + "portfolio/"
          : value === "servicos"
            ? root + "servicos/"
            : root + "sobre/";

    return {
      value,
      label: LABELS[value],
      href: byKey.get(value) || fallback,
    };
  });
}

let mountedRoot: Root | null = null;

function bootRubberTopNav() {
  if (document.documentElement.dataset.msRubberTopnavMounted === "1") return;

  const header =
    document.querySelector<HTMLElement>("header.top") ||
    document.querySelector<HTMLElement>("header.content-layer") ||
    document.querySelector<HTMLElement>("body > header");

  const legacyNav = header?.querySelector<HTMLElement>(".nav");
  if (!header || !legacyNav) return;

  const items = resolveItems(legacyNav);
  const host = document.createElement("div");
  host.id = "ms-rubber-topnav-root";
  host.className = "ms-rubber-topnav-root";
  host.setAttribute("aria-label", "Navegação principal");

  legacyNav.classList.add("ms-rubber-topnav-legacy");
  legacyNav.setAttribute("aria-hidden", "true");
  legacyNav.insertAdjacentElement("afterend", host);

  document.documentElement.dataset.msRubberTopnavMounted = "1";
  header.classList.add("ms-rubber-topnav-header");

  function TopNav() {
    const [value, setValue] = React.useState<NavItem["value"]>(() => detectActive());

    React.useEffect(() => {
      const onPop = () => setValue(detectActive());
      addEventListener("popstate", onPop);
      return () => removeEventListener("popstate", onPop);
    }, []);

    const onChange = (next: string) => {
      const target = items.find((item) => item.value === next);
      if (!target) return;

      setValue(target.value);

      const current = new URL(location.href);
      const destination = new URL(target.href, location.href);
      if (
        current.pathname === destination.pathname &&
        current.search === destination.search
      ) {
        return;
      }

      location.href = destination.href;
    };

    return (
      <div className="ms-rubber-topnav-scroll">
        <RubberSegment
          items={items.map(({ value, label }) => ({ value, label }))}
          value={value}
          onChange={onChange}
          trackColor="rgba(8, 12, 14, 0.88)"
          thumbColor="#35D39A"
          textColor="#E7ECEA"
          activeTextColor="#04130D"
          size="md"
          radius={20}
          inset={4}
          equalSlots={false}
          stretch={100}
          squash={4}
          speed={1}
          glide={75}
          draggable={true}
          aria-label="Navegação principal"
          className="ms-topnav-rubber-segment"
        />
      </div>
    );
  }

  mountedRoot = createRoot(host);
  mountedRoot.render(<TopNav />);

  addEventListener(
    "pagehide",
    () => {
      mountedRoot?.unmount();
      mountedRoot = null;
    },
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootRubberTopNav, { once: true });
} else {
  bootRubberTopNav();
}
