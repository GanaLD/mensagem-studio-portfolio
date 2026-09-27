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

  if (!wrap || !legacy || !catalog) return;

  const items = Array.from(legacy.querySelectorAll<HTMLElement>("[data-cat]"))
    .map((el) => el.dataset.cat || el.textContent?.trim() || "")
    .filter(Boolean);

  const categories = items.length ? items : FALLBACK_ITEMS;

  // The server-rendered catalog predates the data attribute used by the
  // scroll-sync logic. Normalize it once so the active segment always tracks
  // the visible section even before a category is clicked.
  Array.from(catalog.querySelectorAll<HTMLElement>(".category")).forEach((section, index) => {
    if (!section.dataset.serviceCategory) {
      const category = categories[index + 1];
      if (category) section.dataset.serviceCategory = category;
    }
  });

  let host = document.getElementById("rubber-segment-services-root") as HTMLElement | null;
  if (host?.dataset.rubberMounted === "1") return;

  if (!host) {
    host = document.createElement("div");
    host.id = "rubber-segment-services-root";
    host.setAttribute("aria-label", "Categorias de serviços");
    wrap.appendChild(host);
  }

  host.dataset.rubberMounted = "1";
  legacy.classList.add("ms-legacy-filters-hidden");
  legacy.setAttribute("aria-hidden", "true");

  let currentValue = "Todos";
  let setReactValue: ((value: string) => void) | null = null;
  let raf = 0;
  let mutationTimer = 0;
  let clickHoldUntil = 0;

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fallbackMarkup() {
    const buttons = categories
      .map(
        (item, index) =>
          `<button type="button" role="radio" aria-checked="${index === 0 ? "true" : "false"}" tabindex="${index === 0 ? "0" : "-1"}" class="rubber-segment__item" data-rubber-value="${item.replace(/"/g, "&quot;")}">${item}</button>`
      )
      .join("");

    const copies = categories
      .map(
        (item) =>
          `<span class="rubber-segment__item rubber-segment__copy">${item}</span>`
      )
      .join("");

    host.innerHTML =
      '<div class="ms-rubber-segment-scroll">' +
      '<div role="radiogroup" aria-label="Categorias de serviços" data-draggable class="rubber-segment ms-services-rubber-segment" style="--rs-track:rgba(8, 12, 14, 0.88);--rs-thumb:#35D39A;--rs-ink:#E7ECEA;--rs-ink-active:#04130D;--rs-radius:20px;--rs-inset:4px;--rs-thumb-radius:16px;--rs-h:36px;--rs-font:13px;--rs-pad:14px;--rs-min:44px">' +
      buttons +
      '<div class="rubber-segment__thumb" aria-hidden="true">' +
      copies +
      "</div></div></div>";
  }

  function syncFallbackUi(value: string) {
    const track = host.querySelector<HTMLElement>(".rubber-segment");
    if (!track) return;

    const buttons = Array.from(
      host.querySelectorAll<HTMLButtonElement>(".rubber-segment__item[data-rubber-value]")
    );
    const selected = buttons.find((button) => button.dataset.rubberValue === value) || buttons[0];
    if (!selected) return;

    buttons.forEach((button) => {
      const on = button === selected;
      button.setAttribute("aria-checked", String(on));
      button.tabIndex = on ? 0 : -1;
    });

    requestAnimationFrame(() => {
      const thumb = host.querySelector<HTMLElement>(".rubber-segment__thumb");
      if (!thumb) return;

      const trackRect = track.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      const inset = 4;
      const left = Math.max(0, selectedRect.left - trackRect.left - inset);
      const right = Math.max(
        0,
        trackRect.width - inset * 2 - (selectedRect.right - trackRect.left - inset)
      );
      thumb.style.clipPath = `inset(0 ${right}px 0 ${left}px round 16px)`;
    });
  }

  function wireFallback() {
    fallbackMarkup();

    host.querySelectorAll<HTMLButtonElement>("[data-rubber-value]").forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.rubberValue || "Todos";
        selectLegacyCategory(value);
      });
    });

    syncFallbackUi(currentValue);
  }

  const headerHeight = () =>
    Math.max(0, Math.round(header?.getBoundingClientRect().height || 74));

  const railHeight = () =>
    Math.max(0, Math.round(wrap.getBoundingClientRect().height || 62));

  const probeY = () => headerHeight() + railHeight() + 20;

  const sections = () =>
    Array.from(catalog.querySelectorAll<HTMLElement>(".category[data-service-category]"));

  function readVisibleCategory() {
    const list = sections();

    if (!list.length) return currentValue || "Todos";

    // A filtered catalog has exactly one section. Its category is authoritative
    // and must never visually fall back to "Todos".
    if (list.length === 1) {
      return list[0].dataset.serviceCategory || currentValue || "Todos";
    }

    // In the full "Todos" catalog, the active segment follows the section
    // currently crossing the sticky-rail probe line.
    const y = probeY();
    const first = list[0];

    if (first.getBoundingClientRect().top > y) return "Todos";

    let active = first.dataset.serviceCategory || "Todos";
    let bestDistance = Infinity;

    for (const section of list) {
      const rect = section.getBoundingClientRect();
      const cat = section.dataset.serviceCategory || active;

      if (rect.top <= y && rect.bottom > y) return cat;

      const distance = Math.abs(rect.top - y);
      if (rect.top <= y && distance < bestDistance) {
        bestDistance = distance;
        active = cat;
      }
    }

    return active;
  }

  function centerActive() {
    requestAnimationFrame(() => {
      const selected = host.querySelector<HTMLElement>(
        '.rubber-segment__item[aria-checked="true"]'
      );
      if (!selected) return;

      const scroller = host.querySelector<HTMLElement>(".ms-rubber-segment-scroll");
      if (!scroller) return;

      const selectedRect = selected.getBoundingClientRect();
      const scrollerRect = scroller.getBoundingClientRect();
      const delta =
        selectedRect.left +
        selectedRect.width / 2 -
        (scrollerRect.left + scrollerRect.width / 2);

      if (Math.abs(delta) < 6) return;

      scroller.scrollTo({
        left: Math.max(0, scroller.scrollLeft + delta),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
  }

  function applyValue(next: string, center = true) {
    if (!next || !categories.includes(next)) return;
    currentValue = next;
    setReactValue?.(next);
    syncFallbackUi(next);
    if (center) centerActive();
  }

  function syncFromPage(force = false) {
    raf = 0;

    // A short hold prevents the scroll generated by a segment click from
    // repainting the UI to "Todos" before the vanilla catalog finishes
    // replacing its sections.
    if (!force && performance.now() < clickHoldUntil) return;

    const next = readVisibleCategory();
    if (!next || next === currentValue) return;
    applyValue(next);
  }

  function scheduleSync(force = false) {
    if (force) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => syncFromPage(true));
      return;
    }
    if (!raf) raf = requestAnimationFrame(() => syncFromPage(false));
  }

  function resolveLegacyButton(next: string) {
    return Array.from(
      legacy.querySelectorAll<HTMLElement>("[data-cat]")
    ).find((el) => el.dataset.cat === next);
  }

  function selectLegacyCategory(next: string) {
    if (!categories.includes(next)) return;

    applyValue(next);
    clickHoldUntil = performance.now() + 650;

    // renderFilters() recreates the vanilla buttons, so resolve the bridge
    // target immediately before each click.
    resolveLegacyButton(next)?.click();

    clearTimeout(mutationTimer);
    mutationTimer = window.setTimeout(() => {
      // After the catalog has rendered, the visible section becomes the
      // authoritative state. This fixes the old "returns to Todos" bug.
      applyValue(readVisibleCategory());
      scheduleSync(true);
    }, 90);
  }

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
          aria-label="Categorias de serviços"
          className="ms-services-rubber-segment"
        />
      </div>
    );
  }

  // Render a real RubberSegment immediately. If React/motion fails for any
  // browser-specific reason, the same installed component structure remains
  // visible and functional instead of falling back to the legacy chips.
  wireFallback();

  const root = createRoot(host, {
    onUncaughtError(error) {
      console.error("[RubberSegment] React mount failed; keeping component fallback.", error);
      wireFallback();
    },
  });

  root.render(<ServicesRubberSegment />);

  window.setTimeout(() => {
    if (!host.querySelector(".rubber-segment")) wireFallback();
  }, 700);

  addEventListener("scroll", () => scheduleSync(false), { passive: true });
  addEventListener("resize", () => scheduleSync(true), { passive: true });
  addEventListener("orientationchange", () => scheduleSync(true), { passive: true });

  const observer = new MutationObserver(() => {
    clearTimeout(mutationTimer);
    mutationTimer = window.setTimeout(() => {
      applyValue(readVisibleCategory());
      scheduleSync(true);
    }, 30);
  });

  observer.observe(catalog, { childList: true });
  observer.observe(legacy, { childList: true });

  // The rail itself remains controlled by the site's existing sticky/fixed
  // section-bar logic. RubberSegment replaces only the visible button system.
  scheduleSync(true);

  window.addEventListener(
    "pagehide",
    () => {
      observer.disconnect();
      clearTimeout(mutationTimer);
      if (raf) cancelAnimationFrame(raf);
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
