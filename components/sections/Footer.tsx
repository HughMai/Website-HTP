"use client";

import Link from "next/link";
import { ExternalLink, Facebook, MapPin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { FOOTER_LINK_GROUPS, HOTLINE_ROLES, MAIN_NAV, SITE, ZALO_URL } from "@/lib/site-data";

const sitemapLinks = FOOTER_LINK_GROUPS.flatMap((g) => [...g.links]);

export function Footer() {
  const year = new Date().getFullYear();
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
    SITE.mapQuery
  )}&ll=${SITE.mapCoords.lat},${SITE.mapCoords.lng}&z=17&hl=vi&output=embed`;
  const mapLink = SITE.mapDirectionsUrl;

  return (
    <footer
      className="border-t border-white/10 bg-brand-700 text-white/80"
      aria-labelledby="footer-heading"
    >
      <span id="footer-heading" className="sr-only">
        Chân trang
      </span>
      <div className="container grid grid-cols-2 gap-x-6 gap-y-7 py-8 md:gap-10 md:py-16 lg:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          {/* Wordmark on a white tile (it is drawn on white); the name stays as text for NAP. */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-lg bg-white px-2 py-1">
              <Logo height={52} alt="" className="h-[52px] w-auto" />
            </span>
            <p className="sr-only">{SITE.brand}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Đơn vị tiên phong trong lĩnh vực cung cấp và lắp đặt cửa cuốn, cửa
            nhôm kính, cửa kéo cao cấp — đồng hành cùng khách hàng từ năm{" "}
            {SITE.foundedYear}.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href="https://www.facebook.com/104890471381054"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Theo dõi chúng tôi trên Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 transition hover:bg-white hover:text-brand"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Liên hệ qua Zalo"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 transition hover:bg-white hover:text-brand"
            >
              {/* Zalo Z brand mark */}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M8.25 8.5v1.5h4.5l-4.75 5.5V17H16v-1.5h-4.75l4.75-5.5V8.5H8.25z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            Liên Kết Nhanh
          </p>
          {/* Footer nav is a real navigation list, not prose, so each row gets
              a 44px row instead of a 20px line box to aim at. */}
          <ul className="mt-2 text-sm">
            {MAIN_NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex min-h-[44px] items-center text-white/70 transition hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            Thông Tin Liên Hệ
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {/* Split by what the caller wants so they reach the right person
                on the first try instead of being passed around. */}
            {HOTLINE_ROLES.map((r) => (
              <li key={r.number}>
                <span className="text-white/55">{r.role}: </span>
                <a
                  href={`tel:${r.number.replace(/\s/g, "")}`}
                  className="font-semibold text-white hover:text-amber-300"
                >
                  {r.number}
                </a>
              </li>
            ))}
            <li>
              <span className="text-white/55">Email: </span>
              {/* break-all: the address is one unbreakable token and was
                  pushing the 2-col mobile footer wider than the viewport. */}
              <a
                href={`mailto:${SITE.email}`}
                className="break-all hover:text-white"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <span className="text-white/55">Địa chỉ: </span>
              {SITE.address}
            </li>
            <li>
              <span className="text-white/55">Giờ làm: </span>
              {SITE.workingHours}
            </li>
          </ul>
        </div>

        {/* Mini map — hidden on mobile to save space */}
        <div className="col-span-2 hidden md:block md:col-span-1 lg:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider text-white">
              Bản Đồ Showroom
            </p>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mở Google Maps trong tab mới"
              className="inline-flex items-center gap-1 text-xs text-white/70 transition hover:text-white"
            >
              Chỉ đường
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-lg">
            <iframe
              title={`Bản đồ ${SITE.brand}`}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-44 w-full"
              aria-label={`Bản đồ vị trí showroom: ${SITE.address}`}
            />
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 border-t border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs leading-relaxed text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden />
              {SITE.address}
            </a>
          </div>
        </div>
      </div>

      {/* Sitemap links — compact inline row. Keeps every landing page internally
          linked (see FOOTER_LINK_GROUPS) without a full-height link grid. */}
      <div className="border-t border-white/10">
        <nav aria-label="Sơ đồ trang" className="container py-4 md:py-5">
          {/* Two columns of real rows on a phone, the compact dot-separated run
              from sm: up. Eighteen 12px links wrapped into a single paragraph is
              a fine desktop index and an unusable one under a thumb. */}
          <ul className="grid grid-cols-2 gap-x-4 text-sm text-white/60 sm:flex sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-1 sm:text-xs sm:leading-relaxed">
            {sitemapLinks.map((l, i) => (
              <li key={l.href} className="flex items-center gap-2">
                <Link
                  href={l.href}
                  className="flex min-h-[44px] items-center transition hover:text-white sm:min-h-0"
                >
                  {l.label}
                </Link>
                {i < sitemapLinks.length - 1 && (
                  <span aria-hidden className="hidden text-white/25 sm:inline">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-1.5 py-3 text-sm text-white/55 sm:flex-row sm:gap-3 sm:py-5">
          <p>
            © {year} {SITE.brand}. Mọi quyền được bảo lưu.
          </p>
          <Link href="/chinh-sach-bao-mat" className="inline-flex min-h-[44px] items-center transition hover:text-white">
            Chính sách bảo mật
          </Link>
          <p>Được thiết kế & phát triển tận tâm tại Việt Nam.</p>
        </div>
      </div>
    </footer>
  );
}
