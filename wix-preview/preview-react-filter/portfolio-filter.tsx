"use client";

import * as React from "react";
import {
  FilterBar,
  type Filter,
  type FilterFieldDef,
  type FilterOption,
} from "@/components/ui/filter-token-bar";

type CardRecord = {
  el: HTMLElement;
  slug: string;
  title: string;
  categories: string[];
};

const preferredCategories = [
  "3D",
  "Social Media",
  "Audiovisual",
  "Motion",
  "Campanhas",
  "Produto",
  "IA",
  "E-commerce",
  "Manipulação",
  "Design",
];

function readCards(): CardRecord[] {
  return Array.from(document.querySelectorAll<HTMLElement>(".card")).map((el) => {
    const categories = (el.dataset.cats || el.dataset.cat || "")
      .split("|")
      .map((value) => value.trim())
      .filter(Boolean);

    return {
      el,
      slug: el.dataset.projectSlug || el.querySelector("h2")?.textContent?.trim() || "",
      title: el.querySelector("h2")?.textContent?.trim() || el.dataset.projectSlug || "Projeto",
      categories,
    };
  });
}

function createFields(cards: CardRecord[]): FilterFieldDef[] {
  const available = new Set(cards.flatMap((card) => card.categories));
  const orderedCategories = [
    ...preferredCategories.filter((category) => available.has(category)),
    ...Array.from(available).filter((category) => !preferredCategories.includes(category)),
  ];

  const categoryOptions: FilterOption[] = orderedCategories.map((category) => ({
    value: category,
    label: category,
  }));

  const projectOptions: FilterOption[] = cards
    .filter((card) => card.slug)
    .map((card) => ({
      value: card.slug,
      label: card.title,
    }));

  return [
    {
      id: "category",
      label: "Categoria",
      operators: [
        { value: "is", label: "é" },
        { value: "is_not", label: "não é" },
        { value: "is_any", label: "é qualquer um de", multi: true },
      ],
      options: categoryOptions,
    },
    {
      id: "project",
      label: "Projeto",
      operators: [
        { value: "is", label: "é" },
        { value: "is_not", label: "não é" },
      ],
      options: projectOptions,
    },
  ];
}

function cardMatches(card: CardRecord, filter: Filter) {
  if (!filter.values.length) return true;

  if (filter.field === "category") {
    if (filter.operator === "is") {
      return card.categories.includes(filter.values[0]);
    }

    if (filter.operator === "is_not") {
      return !card.categories.includes(filter.values[0]);
    }

    if (filter.operator === "is_any") {
      return filter.values.some((value) => card.categories.includes(value));
    }
  }

  if (filter.field === "project") {
    if (filter.operator === "is") {
      return card.slug === filter.values[0];
    }

    if (filter.operator === "is_not") {
      return card.slug !== filter.values[0];
    }
  }

  return true;
}

export default function PortfolioFilterBar() {
  const cards = React.useMemo(() => readCards(), []);
  const fields = React.useMemo(() => createFields(cards), [cards]);
  const [filters, setFilters] = React.useState<Filter[]>([]);

  React.useEffect(() => {
    cards.forEach((card) => {
      card.el.hidden = !filters.every((filter) => cardMatches(card, filter));
    });

    document.dispatchEvent(
      new CustomEvent("ms:portfolio-filter-change", {
        detail: { filters },
      })
    );
  }, [cards, filters]);

  React.useEffect(
    () => () => {
      cards.forEach((card) => {
        card.el.hidden = false;
      });
    },
    [cards]
  );

  return (
    <div className="dark w-full">
      <FilterBar
        fields={fields}
        value={filters}
        onChange={setFilters}
        addLabel="Filtro"
        emptyLabel="Filtrar projetos"
        aria-label="Filtros de projetos"
        className="w-full"
      />
    </div>
  );
}
