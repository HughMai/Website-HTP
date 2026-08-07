"use client";

import { MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { SITE, ZALO_URL } from "@/lib/site-data";

/**
 * Full-width conversion band dropped between content sections so a visitor
 * never has to scroll back to the top or all the way down to reach the shop.
 */
export function CtaBand({
  title = "Cần báo giá cho công trình của bạn?",
  subtitle = "Gửi số điện thoại — thợ khảo sát gọi lại trong ít phút, tư vấn miễn phí.",
  source,
  id,
}: {
  title?: string;
  subtitle?: string;
  source: string;
  /** Set when something on the same page links down to this band. */
  id?: string;
}) {
  const primaryHotline = SITE.hotlines[0];

  return (
    <section id={id} className="relative scroll-mt-20 overflow-hidden bg-brand py-12 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-amber-400/10 blur-3xl"
      />
      <div className="container relative">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-lg text-white/75">{subtitle}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`tel:${primaryHotline.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-brand transition hover:bg-amber-300"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Gọi {primaryHotline}
              </a>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Nhắn Zalo
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur md:p-6">
            <p className="mb-3 text-sm font-semibold text-white">
              Hoặc để lại thông tin, mình gọi lại:
            </p>
            <LeadForm source={source} tone="dark" submitLabel="Gửi" />
            <p className="mt-3 text-xs text-white/55">
              Khảo sát và báo giá miễn phí trong nội ô Cần Thơ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
