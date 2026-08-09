import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  CalendarDays,
  Images,
  ChevronRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/cong-trinh/ProjectGallery";
import { CongTrinhCard } from "@/components/cong-trinh/CongTrinhCard";
import { CONG_TRINH, getCongTrinh, relatedCongTrinh } from "@/lib/cong-trinh-data";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export function generateStaticParams() {
  return CONG_TRINH.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getCongTrinh(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — Công Trình`,
    description: p.description,
    alternates: { canonical: `${siteUrl}/cong-trinh/${p.slug}` },
    openGraph: {
      type: "article",
      locale: "vi_VN",
      url: `${siteUrl}/cong-trinh/${p.slug}`,
      title: `${p.title} — Hưng Thành Phát Door`,
      description: p.description,
      siteName: "Hưng Thành Phát Door",
      images: [{ url: `${siteUrl}${p.cover}`, alt: p.title }],
    },
  };
}

export default function CongTrinhDetail({ params }: { params: { slug: string } }) {
  const p = getCongTrinh(params.slug);
  if (!p) notFound();
  const related = relatedCongTrinh(p.slug);
  const primary = SITE.hotlines[0];

  const info: [string, string][] = [
    ["Loại cửa / hạng mục", p.categoryLabel],
    ...(p.location ? ([["Địa điểm", p.location]] as [string, string][]) : []),
    ...(p.date ? ([["Thời gian", p.date]] as [string, string][]) : []),
    ["Số hình thực tế", `${p.images.length} ảnh`],
    ["Đơn vị thi công", "Hưng Thành Phát"],
  ];

  return (
    <>
      <Navbar />
      <main id="main">
        {/* breadcrumb (pt-20 clears the fixed navbar) */}
        <nav className="border-b border-brand/10 bg-white pt-20" aria-label="Breadcrumb">
          <ol className="container flex flex-wrap items-center gap-1.5 py-3 text-sm text-brand/70">
            <li>
              <Link href="/" className="hover:text-brand">
                Trang chủ
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <li>
              <Link href="/cong-trinh" className="hover:text-brand">
                Công trình
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <li>
              <Link href={`/cong-trinh?loai=${p.category}`} className="hover:text-brand">
                {p.categoryLabel}
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <li className="line-clamp-1 text-brand/80">{p.title}</li>
          </ol>
        </nav>

        {/* cover hero */}
        <section className="relative flex min-h-[280px] items-end overflow-hidden bg-brand md:min-h-[360px]">
          <Image
            src={p.cover}
            alt={p.title}
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand/40 to-transparent" />
          <div className="container relative py-8 text-white md:py-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
              {p.categoryLabel}
            </span>
            <h1 className="mt-3 max-w-3xl text-balance text-2xl font-semibold tracking-tight md:text-4xl">
              {p.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-white/85">
              {p.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden /> {p.location}
                </span>
              )}
              {p.date && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden /> {p.date}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Images className="h-4 w-4" aria-hidden /> {p.images.length} ảnh thực tế
              </span>
            </div>
          </div>
        </section>

        {/* body */}
        <section className="bg-white py-10 md:py-14">
          <div className="container grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="min-w-0">
              <p className="text-base leading-relaxed text-brand/75">{p.description}</p>
              <h2 className="mb-4 mt-8 text-xs font-bold uppercase tracking-[0.12em] text-brand">
                Hình thực tế tại công trình
              </h2>
              <ProjectGallery images={p.images} title={p.title} />
            </div>

            <aside className="grid gap-5 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-brand/10 bg-white p-5 shadow-[0_10px_40px_-26px_rgba(10,37,64,0.4)]">
                <h2 className="mb-3 text-base font-semibold text-brand">Thông tin công trình</h2>
                <dl className="divide-y divide-brand/10">
                  {info.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
                      <dt className="text-brand/70">{k}</dt>
                      <dd className="text-right font-semibold text-brand">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl bg-brand p-5 text-white shadow-lg">
                <h2 className="text-base font-semibold">Cần công trình tương tự?</h2>
                <p className="mt-1 text-sm text-white/75">
                  Nhận tư vấn &amp; báo giá miễn phí cho công trình của bạn.
                </p>
                <div className="mt-4 grid gap-2">
                  <Button asChild className="bg-white text-brand hover:bg-white/90">
                    <a href={`tel:${primary.replace(/\s/g, "")}`}>
                      <Phone className="h-4 w-4" aria-hidden /> Gọi {primary}
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white hover:text-brand"
                  >
                    <Link href="#nhan-bao-gia">
                      <FileText className="h-4 w-4" aria-hidden /> Nhận báo giá
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* related */}
        <section className="bg-brand-50/60 py-12 md:py-16">
          <div className="container">
            <Link
              href="/cong-trinh"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> Xem tất cả công trình
            </Link>
            <h2 className="mb-6 mt-2 text-xl font-semibold tracking-tight text-brand md:text-2xl">
              Công trình liên quan
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <CongTrinhCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          id="nhan-bao-gia"
          source={`Công trình: ${p.title}`}
          title="Muốn một công trình như thế này?"
        />
      </main>
      <Footer />
    </>
  );
}
