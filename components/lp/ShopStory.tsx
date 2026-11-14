import Image from "next/image";
import { BadgeCheck, MapPin } from "lucide-react";
import { H2 } from "@/components/bang-gia/parts";
import { Stars } from "@/components/lp/Proof";
import { SHOP_QUOTE } from "@/lib/lp-data";
import { SITE } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** The name on the shop sign, which is what Cần Thơ knows it by ("Door" is the website's). */
const SHOP_NAME = "Hưng Thành Phát";

/**
 * The shop behind the page, for a visitor who knows the sign on Võ Văn Kiệt but not the
 * website: the sign itself (name, Mitadoor dealer line, address; the old phone numbers on it
 * were retouched out on 14/11/2026, the original is Enki/htp/brand/hero-concepts/storefront-v2.jpg),
 * the 2005 start at 105 Đường 3/2, and a customer saying the shop is known in Cần Thơ. Facts as
 * in components/sections/About.tsx; the Mitadoor line is the sign's own wording, confirmed by
 * Hughie.
 *
 * Ad pages: after the proof wall, never before it (the sitelink pages promise their job photos
 * directly under the hero). Homepage (Hughie, 14/11/2026): `story={false}`, because About
 * already tells the 2005 → 2022 story there, so this section keeps only the visit.
 */
export function ShopStory({ story = true }: { story?: boolean } = {}) {
  const visit = (
    <>
      Cửa hàng và xưởng ở 235–237 Võ&nbsp;Văn&nbsp;Kiệt, Bình Thủy, có mẫu thật để xem trước khi chọn. Mở
      cửa <span className="whitespace-nowrap">{SITE.workingHours}</span>.
    </>
  );
  return (
    <section className="bg-brand py-12 text-white md:py-16" aria-labelledby="lp-cua-hang">
      <div className="container grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        {/* Phones: a wide crop from the top, so the signboard fills the frame instead of a
            quarter of it. Beside the text on desktop: the whole front, sign to shutters. */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 lg:aspect-[6/5]">
          <Image
            src="/cua-hang-bang-hieu.jpg"
            alt={`Bảng hiệu cửa hàng ${SHOP_NAME}, đại lý ủy quyền Mitadoor, trên đường Võ Văn Kiệt, Bình Thủy, Cần Thơ`}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div>
          <h2 id="lp-cua-hang" className={cn(H2, "max-w-xl text-balance text-white")}>
            Làm cửa cho người miền Tây từ {SITE.foundedYear}
          </h2>
          {story ? (
            <ol className="mt-6 space-y-4">
              <li className="flex gap-4">
                <span className="w-12 shrink-0 text-lg font-semibold tabular-nums text-amber-400">{SITE.foundedYear}</span>
                <span className="text-base leading-relaxed text-white/80">
                  Đơn vị đầu tiên sản xuất và lắp đặt cửa cuốn tại Cần Thơ, khởi nghiệp ở 105 Đường&nbsp;3/2 với một cam
                  kết: lắp đúng thứ đã báo giá.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="w-12 shrink-0 text-lg font-semibold tabular-nums text-amber-400">2022</span>
                <span className="text-base leading-relaxed text-white/80">{visit}</span>
              </li>
            </ol>
          ) : (
            <p className="mt-5 text-base leading-relaxed text-white/80">{visit}</p>
          )}
          <ul className="mt-5 space-y-2 text-base font-semibold text-white">
            <li className="flex items-start gap-2">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
              Đại lý phân phối ủy quyền Mitadoor tại Cần Thơ
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
              Nhận lắp {SITE.serviceArea}
            </li>
          </ul>
          <figure className="mt-6 border-t border-white/10 pt-5">
            <Stars />
            <blockquote className="mt-2 text-lg leading-relaxed text-white">&ldquo;{SHOP_QUOTE.quote}&hellip;&rdquo;</blockquote>
            <figcaption className="mt-2 text-sm text-white/60">{SHOP_QUOTE.name}, đánh giá Google</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
