import type { Gia } from "@/lib/bang-gia-data";
import { H2, Illustration, priceText } from "./parts";

type Kind = "mac-vong" | "tron" | "vuong";

const kindOf = (mau: string): Kind =>
  mau.startsWith("Mắc võng") ? "mac-vong" : mau.startsWith("Song tròn") ? "tron" : "vuong";

/** Front view of each grille, drawn flat in the brand colours — there is no photo of these yet. */
function Profile({ kind }: { kind: Kind }) {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16 bg-brand-50" aria-hidden>
      {kind === "mac-vong" ? (
        <path
          d="M4 14 14 4 24 14 34 4 44 14 54 4 60 10M4 34 14 24 24 34 34 24 44 34 54 24 60 30M4 54 14 44 24 54 34 44 44 54 54 44 60 50M4 14 14 24 24 14 34 24 44 14 54 24 60 18M4 34 14 44 24 34 34 44 44 34 54 44 60 38"
          fill="none"
          stroke="#0A2540"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      ) : (
        <>
          {[14, 26, 38, 50].map((y) => (
            <rect
              key={y}
              x="5"
              y={y - (kind === "tron" ? 3 : 4)}
              width="54"
              height={kind === "tron" ? 6 : 8}
              rx={kind === "tron" ? 3 : 0}
              fill="#0A2540"
            />
          ))}
          <rect x="18" y="8" width="3" height="48" fill="#5C7798" />
          <rect x="43" y="8" width="3" height="48" fill="#5C7798" />
        </>
      )}
    </svg>
  );
}

/**
 * One block per material, each item a drawn bullet, name, price, spec line. Two or more materials
 * sit side by side; a single one (thép only, since 10/11/2026) spreads its items over both columns.
 */
export function SongNgangList({
  groups,
}: {
  groups: {
    key: string;
    vatLieu: string;
    rows: { mau: string; gia: Gia; sub?: string }[];
    image?: { src: string; alt: string };
  }[];
}) {
  const single = groups.length === 1;
  return (
    <div className={`mt-10 grid gap-x-16 gap-y-14 ${single ? "" : "md:grid-cols-2"}`}>
      {groups.map((g) => (
        <div key={g.key} data-rise>
          <div className="flex items-start gap-5">
            {g.image && <Illustration src={g.image.src} alt={g.image.alt} className="w-24" />}
            <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className={`${H2} text-brand`}>{g.vatLieu}</h3>
              <span className="text-base text-slate-600">{g.rows.length} kiểu · đ/m²</span>
            </div>
          </div>
          <ul className={single ? "mt-7 grid gap-x-16 gap-y-7 md:grid-cols-2" : "mt-7 space-y-7"}>
            {g.rows.map((r) => (
              <li key={r.mau} className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-5">
                <Profile kind={kindOf(r.mau)} />
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-base font-semibold text-brand">{r.mau}</span>
                    <span className="whitespace-nowrap text-xl font-semibold tabular-nums text-brand">
                      {priceText(r.gia)}
                    </span>
                  </div>
                  {r.sub && <p className="mt-0.5 text-base leading-snug text-slate-600">{r.sub}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
