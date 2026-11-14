import { LeadForm } from "@/components/LeadForm";
import { Checks, ProofLine } from "@/components/lp/Proof";
import { ZaloStickyBar } from "@/components/ZaloStickyBar";
import { INSTALL_FORM, INSTALL_PROOF, type LpForm, type LpProof } from "@/lib/lp-data";
import { cn } from "@/lib/utils";

/**
 * "Ghi số Zalo để nhận báo giá ngay lập tức" as a white card, for the top of a page:
 * the visitor leaves a Zalo number, the CRM's Zalo bot sends the catalog to it, and the
 * family is pinged to call. Under the button: the Google rating and one real review
 * sentence, because that is where the visitor hesitates. Once the card scrolls away,
 * the same field follows the visitor as a bar at the bottom of the screen (ZaloStickyBar).
 *
 * Used in the hero of the ad pages (/lp/*), the product and district pages, and the
 * price pages. `source` tags the lead in the CRM, so make it say which page and spot;
 * leads from the bottom bar get " · thanh dưới" appended.
 */
export function ZaloQuoteCard({
  source,
  id,
  track = "hero_form",
  proof = INSTALL_PROOF,
  form = INSTALL_FORM,
  checks,
  sticky = true,
  className,
}: {
  source: string;
  id?: string;
  track?: string;
  proof?: LpProof;
  /** Title and button label. The price ad pages say "bảng giá" instead of "báo giá". */
  form?: LpForm;
  /** Risk reversals ticked directly under the button (the ad pages). */
  checks?: string[];
  /** Also pin the field to the bottom of the screen once this card scrolls away. */
  sticky?: boolean;
  className?: string;
}) {
  const titleId = `${id ?? "zalo-quote"}-title`;
  return (
    <>
      <section
        id={id}
        aria-labelledby={titleId}
        data-track={track}
        data-zalo-card=""
        className={cn(
          "scroll-mt-24 rounded-2xl bg-white p-4 text-left text-brand shadow-[0_8px_32px_rgba(0,0,0,0.28)] sm:p-5",
          className
        )}
      >
        <h2 id={titleId} className="text-balance text-xl font-semibold leading-snug tracking-tight">
          {form.title}
        </h2>
        {form.note && <p className="mt-1 text-sm text-slate-600">{form.note}</p>}
        <LeadForm
          source={source}
          tone="light"
          submitLabel={form.submitLabel}
          className="mt-3"
          belowButton={checks && <Checks items={checks} tone="light" className="mt-3" />}
        />
        <ProofLine proof={proof} tone="light" className="mt-4 border-t border-brand/10 pt-3" />
      </section>
      {sticky && (
        <ZaloStickyBar source={`${source.replace(/ · đầu trang$/, "")} · thanh dưới`} watch="[data-zalo-card]" />
      )}
    </>
  );
}
