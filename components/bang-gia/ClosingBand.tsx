import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { SITE, ZALO_URL } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { H2, TEL } from "./parts";

/**
 * Close of each bảng giá page: three real HTP jobs butted edge to edge, then the navy field
 * with the one action — the underlined phone number — and the lead form beside it.
 */
export function ClosingBand({
  id = "nhan-bao-gia",
  source,
  photos,
}: {
  id?: string;
  source: string;
  photos: { src: string; alt: string }[];
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20">
      <div className="grid grid-cols-2 md:grid-cols-3">
        {photos.slice(0, 3).map((p, i) => (
          <div
            key={p.src}
            className={cn("relative aspect-[4/3] md:aspect-auto md:h-[40svh] md:min-h-[260px]", i === 0 && "col-span-2 md:col-span-1")}
          >
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 34vw, (min-width: 0px) 50vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="bg-brand py-16 text-white md:py-20">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" data-rise>
            <h2 id={`${id}-title`} className={H2}>
              Thợ đến đo tận nơi, báo giá trong ngày
            </h2>
            <p className="mt-5 max-w-[34rem] text-xl leading-relaxed text-white/90">
              Lắp xong, nghiệm thu rồi mới thanh toán.{" "}
              <a
                href={TEL}
                className="whitespace-nowrap font-semibold text-white underline decoration-amber-400 decoration-4 underline-offset-[6px] transition hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Gọi {SITE.hotlines[0]}
              </a>{" "}
              hoặc{" "}
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline decoration-white/40 underline-offset-[6px] transition hover:decoration-amber-400"
              >
                nhắn Zalo
              </a>
              .
            </p>
            <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-white/85">
              Khảo sát, đo đạc miễn phí nội thành Cần Thơ; số đo thực tế tại công trình là số chốt. Bồi
              thường 200% nếu dùng sai vật liệu đã cam kết. {SITE.workingHours}.
            </p>
          </div>
          <div className="lg:col-span-5" data-rise>
            <p className="mb-4 text-base font-semibold">Hoặc để lại số, thợ gọi lại:</p>
            <LeadForm source={source} tone="dark" submitLabel="Gửi" />
          </div>
        </div>
      </div>
    </section>
  );
}
