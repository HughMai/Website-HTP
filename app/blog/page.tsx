import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/lib/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export const metadata: Metadata = {
  title: "Blog Tư Vấn Cửa — Hưng Thành Phát Door Cần Thơ",
  description:
    "Kiến thức về cửa cuốn, cửa nhôm kính, cửa kéo — so sánh chất liệu, hướng dẫn bảo trì, mẹo chọn cửa phù hợp cho nhà phố và nhà xưởng tại Cần Thơ.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteUrl}/blog`,
    title: "Blog Tư Vấn Cửa — Hưng Thành Phát Door Cần Thơ",
    description: "Kiến thức và hướng dẫn về cửa cuốn, nhôm kính, cửa kéo tại Cần Thơ.",
    siteName: "Hưng Thành Phát Door",
    images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: "Hưng Thành Phát Door" }],
  },
};

const posts = [
  {
    slug: "nhom-duc-vs-thep-tinh-dien",
    title: "Cửa Cuốn Nhôm Đức Hay Thép Tĩnh Điện? So Sánh Chi Tiết 2026",
    excerpt:
      "Hai dòng cửa cuốn phổ biến nhất tại Cần Thơ — nhôm công nghệ Đức và thép sơn tĩnh điện. Bài viết phân tích 6 tiêu chí giúp bạn chọn đúng loại cho nhu cầu thực tế.",
    readTime: "5 phút",
    category: "So sánh & tư vấn",
  },
  {
    slug: "cach-bao-tri-cua-cuon",
    title: "Hướng Dẫn Bảo Trì Cửa Cuốn Đúng Cách — 5 Bước Đơn Giản",
    excerpt:
      "Bảo trì cửa cuốn đúng cách giúp tăng tuổi thọ từ 5 lên 10–15 năm và giảm 80% sự cố hỏng hóc đột xuất. Hướng dẫn từng bước dành cho chủ nhà và doanh nghiệp.",
    readTime: "6 phút",
    category: "Hướng dẫn bảo trì",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-brand pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="container text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Kiến thức & tư vấn
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl">
              Blog Tư Vấn Cửa —{" "}
              <span className="bg-gradient-to-r from-white via-white to-sky-200 bg-clip-text text-transparent">
                Hưng Thành Phát Door
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-white/80">
              Kiến thức thực tế từ 21+ năm thi công cửa cuốn, nhôm kính và cửa kéo tại Cần Thơ.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container max-w-3xl">
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border bg-card p-6 hover:bg-brand/5 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold group-hover:text-brand transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand">
                    Đọc bài viết <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 rounded-2xl bg-brand/5 border border-brand/10 p-8 text-center">
              <p className="font-semibold text-brand">Cần tư vấn trực tiếp?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Gọi cho {SITE.brand} để được tư vấn miễn phí về loại cửa phù hợp nhất cho công trình của bạn.
              </p>
              <a
                href={`tel:${SITE.hotlines[0].replace(/\s/g, "")}`}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand/90"
              >
                Gọi {SITE.hotlines[0]}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
