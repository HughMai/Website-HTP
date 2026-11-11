import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD = ["bg-brand-50 text-brand", "bg-slate-200 text-brand", "bg-brand text-white"];

/**
 * Questions filed like index cards in a drawer: each card a filled panel with a tab on its
 * top edge, the tabs stepping right card by card, every card overlapping the one above.
 * Native <details name>, so one opens at a time and it all works without JavaScript.
 */
export function FaqCards({
  group,
  items,
  aside,
}: {
  group: string;
  items: { tab: string; question: string; answer: string }[];
  /** Fills the right-hand columns on wide screens (the showroom photo). */
  aside?: React.ReactNode;
}) {
  return (
    <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
      <div className={aside ? "lg:col-span-8" : "lg:col-span-12"}>
      {items.map((it, i) => (
        <details
          key={it.question}
          {...({ name: group } as Record<string, string>)}
          open={i === 0}
          className={cn("group relative", i > 0 && "-mt-3")}
          style={{ zIndex: i + 1, "--i": i } as React.CSSProperties}
          data-rise
        >
          <summary className="block cursor-pointer list-none focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            <span
              className={cn(
                "ml-[calc(var(--i)*2.5rem)] inline-flex min-h-[40px] items-end px-5 pb-1.5 pt-2.5 text-base font-semibold md:ml-[calc(var(--i)*6.5rem)] lg:ml-[calc(var(--i)*5rem)] xl:ml-[calc(var(--i)*7rem)]",
                CARD[i % 3]
              )}
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)", paddingRight: "2rem" }}
            >
              {it.tab}
            </span>
            <span
              className={cn(
                "flex min-h-[56px] items-center justify-between gap-4 px-5 py-4 text-xl font-medium leading-snug transition-[filter] group-hover:brightness-[0.97] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:-outline-offset-2 group-focus-visible:outline-amber-400 md:px-8",
                CARD[i % 3]
              )}
            >
              {it.question}
              <Plus className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden />
            </span>
          </summary>
          <div className={cn("px-5 pb-8 pt-1 md:px-8", CARD[i % 3])}>
            <p className="max-w-[62ch] text-base leading-relaxed">{it.answer}</p>
          </div>
        </details>
      ))}
      </div>
      {aside && (
        <div className="lg:col-span-4" data-rise>
          {aside}
        </div>
      )}
    </div>
  );
}
