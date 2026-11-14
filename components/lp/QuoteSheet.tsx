"use client";

import { Send } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { LpForm, LpProof } from "@/lib/lp-data";
import { cn } from "@/lib/utils";
import { Checks, ProofLine } from "./Proof";

/**
 * The install pages' one ask, from anywhere on the page: a button that slides the
 * Zalo-number form up from the bottom, so a visitor at the price table never scrolls
 * back to the top to convert. Used by the sticky bar (phones) and the mid-page rows
 * (desktop). The form mounts only when the sheet opens, and the phone field takes
 * focus, so the keyboard is already up.
 */
export function QuoteButton({
  slug,
  form,
  proof,
  checks,
  className,
  tabIndex,
}: {
  slug: string;
  form: LpForm;
  proof: LpProof;
  checks?: string[];
  className?: string;
  tabIndex?: number;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          tabIndex={tabIndex}
          className={cn(
            "flex h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-base font-bold text-brand transition-colors hover:bg-amber-300 active:bg-amber-300",
            className
          )}
        >
          <Send className="h-4 w-4" aria-hidden />
          {form.submitLabel}
        </button>
      </SheetTrigger>
      {/* Fixed with left/right 0, a max width and auto margins: a bottom sheet on a phone,
          a centred card on desktop, without fighting the slide-in transform. */}
      <SheetContent
        side="bottom"
        className="mx-auto max-w-md rounded-t-2xl p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        data-track="lp_sheet"
        aria-describedby={undefined}
      >
        <SheetTitle className="pr-10 text-xl leading-snug tracking-tight">{form.title}</SheetTitle>
        {form.note && <p className="mt-1 text-sm text-slate-600">{form.note}</p>}
        <LeadForm
          source={`lp_${slug}`}
          tone="light"
          submitLabel={form.submitLabel}
          className="mt-3"
          belowButton={checks && <Checks items={checks} tone="light" className="mt-3" />}
        />
        <ProofLine proof={proof} tone="light" className="mt-4 border-t border-brand/10 pt-3" />
      </SheetContent>
    </Sheet>
  );
}
