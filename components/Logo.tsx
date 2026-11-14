import { SITE } from "@/lib/site-data";

// The HTP DOOR wordmark (12/11/2026; master: Enki/htp/brand/logo-htp-door.png).
// Served as pre-rendered WebP at 160/320/480/640/960px wide (Lanczos + light sharpen,
// q92) rather than through next/image: the optimizer's default re-encode is what made the
// small logo look blurry. 640 and 960 (14/11/2026) are for the ad pages' brand bar, where
// the logo is ~256px wide on a phone and needs ~770px on a 3× screen. Drawn on white, so
// put it on a white or light surface.
const RATIO = 826 / 375;
const SRCSET = [160, 320, 480, 640, 960].map((w) => `/logo-htp-door-${w}.webp ${w}w`).join(", ");

export function Logo({
  height,
  className,
  alt = SITE.brand,
  sizes,
}: {
  height: number;
  className?: string;
  alt?: string;
  /** When CSS renders the logo at other sizes than `height` (responsive classes). */
  sizes?: string;
}) {
  const width = Math.round(height * RATIO);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized files; see note above
    <img
      src="/logo-htp-door-320.webp"
      srcSet={SRCSET}
      sizes={sizes ?? `${width}px`}
      width={width}
      height={height}
      alt={alt}
      decoding="async"
      className={className}
    />
  );
}
