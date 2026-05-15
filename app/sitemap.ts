import { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hungthanhphat.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/sua-chua-cua-cuon-can-tho`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/lap-dat-cua-cuon-can-tho`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cua-cuon-nhom-can-tho`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cua-keo-thep-can-tho`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/bao-gia-cua-cuon-can-tho`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/bang-gia-cua-keo-can-tho`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/bang-gia-cua-nhom-kinh-can-tho`,
      lastModified: new Date("2026-05-14"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/cua-nhom-kinh-can-tho`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cua-keo-can-tho`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/cua-cuon-binh-thuy`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/lan-can-nhom-kinh-can-tho`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/cua-cuon-nha-xuong-can-tho`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/nhom-duc-vs-thep-tinh-dien`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/blog/cach-bao-tri-cua-cuon`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/blog/motor-cua-cuon-tot-nhat`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/cua-cuon-ninh-kieu`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${siteUrl}/cua-cuon-cai-rang`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${siteUrl}/cua-cuon-o-mon`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${siteUrl}/cua-cuon-thot-not`,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];
}
