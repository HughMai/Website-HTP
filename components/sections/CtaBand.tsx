"use client";

import Link from "next/link";
import { Check, MessageCircle, Phone } from "lucide-react";
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
  paymentLine = "Đặt cọc 30%, lắp đặt xong mới thanh toán",
}: {
  title?: string;
  subtitle?: string;
  source: string;
  /** Installs take a deposit; repairs don't. The repair page overrides this. */
  paymentLine?: string;
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
            <p className="mt-3 text-sm text-white/55">
              Khảo sát và báo giá miễn phí trong nội ô Cần Thơ.
            </p>

            {/* Doubt peaks at the CTA, so the risk answers belong here — not only
                up in the hero where the visitor has already scrolled past them. */}
            <ul className="mt-4 space-y-2 border-t border-white/12 pt-4">
              {[
                paymentLine,
                "Sai vật tư đã cam kết, HTP bồi thường 100% giá trị hợp đồng",
              ].map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-white/75">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden />
                  {line}
                </li>
              ))}
              <li className="flex items-start gap-2 text-sm text-white/75">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" aria-hidden />
                <span>
                  Ảnh thật từng công trình đã lắp —{" "}
                  <Link href="/cong-trinh" className="font-semibold text-amber-400 underline-offset-2 hover:underline">
                    xem công trình
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
