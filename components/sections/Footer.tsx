"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Facebook, MapPin } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site-data";

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
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-auto items-center justify-center rounded-md bg-white px-2 py-1.5">
              <Image
                src="/logo.svg"
                alt={`${SITE.brand} — Logo`}
                width={40}
                height={40}
                className="h-9 w-9"
              />
            </span>
            <p className="text-base font-semibold text-white">{SITE.brand}</p>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/65 sm:text-sm">
            Đơn vị tiên phong trong lĩnh vực cung cấp và lắp đặt cửa cuốn, cửa
            nhôm kính, cửa kéo cao cấp — đồng hành cùng khách hàng từ năm{" "}
            {SITE.foundedYear}.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=100041851129169"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Theo dõi chúng tôi trên Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 transition hover:bg-white hover:text-brand"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://zalo.me/0945042345"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Liên hệ qua Zalo"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 transition hover:bg-white hover:text-brand"
            >
              {/* Zalo Z brand mark */}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M8.25 8.5v1.5h4.5l-4.75 5.5V17H16v-1.5h-4.75l4.75-5.5V8.5H8.25z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white sm:text-sm">
            Liên Kết Nhanh
          </p>
          <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`/#${l.id}`}
                  className="text-white/70 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/sua-chua-cua-cuon-can-tho"
                className="text-white/70 transition hover:text-white"
              >
                Sửa Chữa Cửa Cuốn
              </Link>
            </li>
            <li>
              <Link
                href="/bao-gia-cua-cuon-can-tho"
                className="text-white/70 transition hover:text-white"
              >
                Bảng Giá Cửa Cuốn
              </Link>
            </li>
            <li>
              <Link
                href="/bang-gia-cua-keo-can-tho"
                className="text-white/70 transition hover:text-white"
              >
                Bảng Giá Cửa Kéo
              </Link>
            </li>
            <li>
              <Link
                href="/bang-gia-cua-nhom-kinh-can-tho"
                className="text-white/70 transition hover:text-white"
              >
                Bảng Giá Cửa Nhôm Kính
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white sm:text-sm">
            Thông Tin Liên Hệ
          </p>
          <ul className="mt-3 space-y-1.5 text-xs text-white/75 sm:text-sm">
            <li>
              <span className="text-white/55">Hotline: </span>
              <div className="mt-1 flex flex-col">
                {SITE.hotlines.map((h) => (
                  <a
                    key={h}
                    href={`tel:${h.replace(/\s/g, "")}`}
                    className="hover:text-white"
                  >
                    {h}
                  </a>
                ))}
              </div>
            </li>
            <li>
              <span className="text-white/55">Email: </span>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-white"
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
              className="flex items-start gap-2 border-t border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs leading-relaxed text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden />
              {SITE.address}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-1.5 py-3 text-xs text-white/55 sm:flex-row sm:gap-3 sm:py-5">
          <p>
            © {year} {SITE.brand}. Mọi quyền được bảo lưu.
          </p>
          <p>Được thiết kế & phát triển tận tâm tại Việt Nam.</p>
        </div>
      </div>
    </footer>
  );
}
