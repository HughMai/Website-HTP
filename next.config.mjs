/** @type {import('next').NextConfig} */
// hungthanhphatdoor.com is HTP's own abandoned site (Nasani-built, 93 live URLs).
// It still ranks on brand searches and hands visitors an unmonitored contact form,
// so it leaks leads and splits the brand. These 301s fold it into the real site.
// Active only once the domain's nameservers are pointed at Vercel.
const LEGACY_HOST = "hungthanhphatdoor.com";
const legacyHost = (value) => [{ type: "host", value }];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  async redirects() {
    return [
      // Closest topical equivalents first — the legacy site was nhôm kính heavy.
      ...[
        ["/nhom-kinh-noi-that", "/cua-nhom-kinh-can-tho"],
        ["/canh-kinh-tu-ao", "/cua-nhom-kinh-can-tho"],
        ["/he-slim-door", "/cua-nhom-kinh-can-tho"],
        ["/nhom-trang-tri", "/cua-nhom-kinh-can-tho"],
        ["/phu-kien-canh-kinh", "/cua-nhom-kinh-can-tho"],
        ["/tu-nhom-kinh-gia-dinh", "/cua-nhom-kinh-can-tho"],
        ["/kinh-nha", "/cua-nhom-kinh-can-tho"],
        ["/lan-can-cau-thang", "/lan-can-nhom-kinh-can-tho"],
      ].flatMap(([source, path]) => [
        { source, has: legacyHost(LEGACY_HOST), destination: `https://hungthanhphat.vn${path}`, permanent: true },
        { source, has: legacyHost(`www.${LEGACY_HOST}`), destination: `https://hungthanhphat.vn${path}`, permanent: true },
      ]),
      // Everything else on the legacy host — including the lead-leaking /lien-he form.
      ...[LEGACY_HOST, `www.${LEGACY_HOST}`].map((value) => ({
        source: "/:path*",
        has: legacyHost(value),
        destination: "https://hungthanhphat.vn/",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
