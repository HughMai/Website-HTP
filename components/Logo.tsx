import { SITE } from "@/lib/site-data";

// The HTP DOOR wordmark (12/11/2026; master: Enki/htp/brand/logo-htp-door.png).
// Served as pre-rendered WebP at 160/320/480px wide (Lanczos + light sharpen, q92)
// rather than through next/image: the optimizer's default re-encode is what made the
// small logo look blurry. Drawn on white, so put it on a white or light surface.
const RATIO = 826 / 375;
const SRCSET = "/logo-htp-door-160.webp 160w, /logo-htp-door-320.webp 320w, /logo-htp-door-480.webp 480w";

export function Logo({ height, className, alt = SITE.brand }: { height: number; className?: string; alt?: string }) {
  const width = Math.round(height * RATIO);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- pre-sized files; see note above
    <img
      src="/logo-htp-door-320.webp"
      srcSet={SRCSET}
      sizes={`${width}px`}
      width={width}
      height={height}
      alt={alt}
      decoding="async"
      className={className}
    />
  );
}
