import Link from "next/link";
import Image from "next/image";
import type { CongTrinh } from "@/lib/cong-trinh-data";

export function CongTrinhCard({ p }: { p: CongTrinh }) {
  const meta = [p.location, p.date].filter(Boolean).join(" · ");
  return (
    <Link
      href={`/cong-trinh/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-[0_10px_40px_-24px_rgba(10,37,64,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-22px_rgba(10,37,64,0.4)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <Image
          src={p.cover}
          alt={p.title}
          fill
          sizes="(min-width:1024px) 360px, (min-width:640px) 45vw, 92vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-brand/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {p.categoryLabel}
        </span>
        {p.images.length > 1 && (
          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-brand-900/70 px-2 py-0.5 text-[11px] font-semibold text-white">
            {p.images.length} ảnh
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-brand">{p.title}</h3>
        {meta && <p className="mt-1.5 text-[13px] text-brand/55">{meta}</p>}
      </div>
    </Link>
  );
}
