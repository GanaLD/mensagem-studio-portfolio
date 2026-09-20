import * as React from "react";
import { createRoot } from "react-dom/client";
import RubberSegment from "@/components/RubberSegment";
import "@/rubber-index.css";

const FALLBACK_ITEMS = [
  "Todos",
  "Social Media",
  "Vídeo",
  "Produção",
  "Motion e VFX",
  "Fotos",
  "Manipulação",
  "Identidade",
  "Campanhas",
  "E-commerce",
  "Narrativa Visual",
  "3D",
  "Web / HTML",
];

function bootRubberSegment() {
  const wrap = document.querySelector<HTMLElement>(".filters-wrap");
  const legacy = document.getElementById("filters");
  const catalog = document.getElementById("catalog");
  const header = document.querySelector<HTMLElement>(".top");

  if (!wrap || !legacy || !catalog || document.getElementById("rubber-segment-services-root")) return;

  const items = Array.from(legacy.querySelectorAll<HTMLElement>("[data-cat]"))
    .map((el) => el.dataset.cat || el.textContent?.trim() || "")
    .filter(Boolean);

  const categories = items.length ? items : FALLBACK_ITEMS;

  const host = document.createElement("div");
  host.id = "rubber-segment-services-root";
  host.setAttribute("aria-label", "Categorias de serviços");
  legacy.classList.add("ms-legacy-filters-hidden");
  legacy.setAttribute("aria-hidden", "true");
  wrap.appendChild(host);

  let currentValue = "Todos";
  let setReactValue: ((value: string) => void) | null = null;
  let raf = 0;
  let mutationTimer = 0;

  const railTop = () => {
    const headerH = Math.max(0, Math.round(header?.getBoundingClientRect().height || 74));
    const railH = Math.max(0, Math.round(wrap.getBoundingClientRect().height || 62));
    return headerH + railH + 18;
  };

  const readVisibleCategory = () => {
    const sections = Array.from(
      catalog.querySelectorAll<HTMLElement>(".category[data-service-category]")
    );

    if (!sections.length) return currentValue;

    // When the vanilla catalog is filtered, it renders exactly one section.
    // That section is the selected category and must never visually fall back to "Todos".
    if (sections.length === 1) {
      return sections[0].dataset.serviceCategory || currentValue;
    }

    const probeY = railTop();
    const catalogTop = catalog.getBoundingClientRect().top;

    if (catalogTop > probeY) return "Todos";

    let active = "Todos";
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= probeY) {
        active = section.dataset.serviceCategory || active;
      } else {
        break;
      }
    }

    return active;
  };

  const centerActive = () => {
    requestAnimationFrame(() => {
      const selected = host.querySelector<HTMLElement>(
        '.rubber-segment__item[aria-checked="true"]'
      );
      selected?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    });
  };

  const syncFromPage = () => {
    raf = 0;
    const next = readVisibleCategory();
    if (!next || next === currentValue) return;
    currentValue = next;
    setReactValue?.(next);
    centerActive();
  };

  const scheduleSync = () => {
    if (!raf) raf = requestAnimationFrame(syncFromPage);
  };

  const selectLegacyCategory = (next: string) => {
    currentValue = next;
    setReactValue?.(next);

    // renderFilters() recreates these buttons, so resolve the target at click time.
    const button = Array.from(
      legacy.querySelectorAll<HTMLElement>("[data-cat]")
    ).find((el) => el.dataset.cat === next);

    button?.click();

    clearTimeout(mutationTimer);
    mutationTimer = window.setTimeout(() => {
      scheduleSync();
      centerActive();
    }, 120);
  };

  function ServicesRubberSegment() {
    const [value, setValue] = React.useState(() => readVisibleCategory());

    React.useEffect(() => {
      currentValue = value;
      setReactValue = setValue;
      centerActive();

      return () => {
        if (setReactValue === setValue) setReactValue = null;
      };
    }, [value]);

    return (
      <div className="ms-rubber-segment-scroll">
        <RubberSegment
          items={categories}
          value={value}
          onChange={(next) => selectLegacyCategory(String(next))}
          trackColor="rgba(9, 13, 15, 0.88)"
          thumbColor="#35D39A"
          textColor="#F4F4EF"
          activeTextColor="#04130D"
          size="md"
          radius={18}
          inset={4}
          equalSlots={false}
          stretch={100}
          squash={4}
          speed={1}
          glide={75}
          draggable={true}
          aria-label="Categorias de serviços"
          className="ms-services-rubber-segment"
        />
      </div>
    );
  }

  const root = createRoot(host);
  root.render(<ServicesRubberSegment />);

  addEventListener("scroll", scheduleSync, { passive: true });
  addEventListener("resize", scheduleSync, { passive: true });
  addEventListener("orientationchange", scheduleSync, { passive: true });

  const observer = new MutationObserver(() => {
    clearTimeout(mutationTimer);
    mutationTimer = window.setTimeout(scheduleSync, 30);
  });
  observer.observe(catalog, { childList: true, subtree: false });
  observer.observe(legacy, { childList: true });

  scheduleSync();

  window.addEventListener(
    "pagehide",
    () => {
      observer.disconnect();
      clearTimeout(mutationTimer);
      root.unmount();
    },
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootRubberSegment, { once: true });
} else {
  bootRubberSegment();
}
