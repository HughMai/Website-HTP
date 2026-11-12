import { Star } from "lucide-react";
import type { LpProof } from "@/lib/lp-data";
import { GOOGLE_RATING } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label="5 sao">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(className, "fill-amber-400 text-amber-400")} aria-hidden />
      ))}
    </span>
  );
}

/**
 * The Google rating plus one sentence from a real review, for directly under an ask.
 * Proof belongs where the visitor hesitates (typing a phone number), not only in the
 * reviews section further down.
 */
export function ProofLine({
  proof,
  tone,
  className,
}: {
  proof: LpProof;
  tone: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  const muted = dark ? "text-white/60" : "text-slate-500";
  return (
    <div className={cn("text-sm", className)}>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <Stars className="h-3.5 w-3.5" />
        <span className={cn("font-semibold", dark ? "text-white" : "text-brand")}>{GOOGLE_RATING.score}</span>
        <span className={muted}>· {GOOGLE_RATING.count} đánh giá Google</span>
      </p>
      <blockquote className={cn("mt-1 leading-snug", dark ? "text-white/80" : "text-slate-700")}>
        &ldquo;{proof.quote}&rdquo; <span className={muted}>— {proof.name}</span>
      </blockquote>
    </div>
  );
}
