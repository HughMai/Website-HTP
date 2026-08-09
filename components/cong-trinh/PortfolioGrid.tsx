"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CONG_TRINH_CATEGORIES,
  type CongTrinh,
  type CongTrinhCategory,
} from "@/lib/cong-trinh-data";
import { CongTrinhCard } from "./CongTrinhCard";

type Filter = CongTrinhCategory | "all";

export function PortfolioGrid({
  items,
  initialFilter = "all",
}: {
  items: CongTrinh[];
  initialFilter?: Filter;
}) {
  const [filter, setFilter] = React.useState<Filter>(initialFilter);

  const counts = React.useMemo(() => {
    const m: Record<string, number> = { all: items.length };
    for (const p of items) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, [items]);

  const shown = filter === "all" ? items : items.filter((p) => p.category === filter);
  const pills: { key: Filter; label: string }[] = [
    { key: "all", label: "Tất cả" },
    ...CONG_TRINH_CATEGORIES.map((c) => ({ key: c.key as Filter, label: c.label })),
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {pills.map((p) => {
          const on = filter === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setFilter(p.key)}
              aria-pressed={on}
              className={cn(
                "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition",
                on
                  ? "border-brand bg-brand text-white"
                  : "border-brand/15 bg-white text-brand/70 hover:border-brand/40 hover:text-brand"
              )}
            >
              {p.label}
              <span className={cn("text-xs font-semibold", on ? "text-white/70" : "text-brand/70")}>
                {counts[p.key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <CongTrinhCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
