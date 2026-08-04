import Link from "next/link";
import { Clock, MapPin, Truck } from "lucide-react";
import { SERVICE_AREAS, SITE } from "@/lib/site-data";

const promises = [
  {
    icon: Clock,
    title: "Khảo sát trong ngày",
    body: "Gọi trước 15h, thợ tới đo trong ngày ở nội ô Cần Thơ.",
  },
  {
    icon: Truck,
    title: "Giao lắp tận nơi",
    body: "Xưởng ngay Bình Thủy nên chủ động vật tư và thời gian lắp.",
  },
  {
    icon: MapPin,
    title: "Bảo trì tại chỗ",
    body: "Cửa kẹt, motor lỗi — thợ quen công trình quay lại xử lý.",
  },
];

export function ServiceAreas() {
  return (
    <section
      className="bg-gray-50 py-14 md:py-20"
      aria-labelledby="khu-vuc-heading"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Khu Vực Phục Vụ
          </span>
          <h2
            id="khu-vuc-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
          >
            Thợ Cần Thơ, làm cho người Cần Thơ
          </h2>
          <p className="mt-4 text-base text-brand/70">
            Xưởng đặt tại {SITE.address.split(",").slice(1).join(",").trim()} —
            đi tới công trình nào trong thành phố cũng nhanh.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SERVICE_AREAS.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="rounded-full border border-brand/15 bg-white px-5 py-2.5 text-sm font-medium text-brand transition hover:border-amber-400 hover:bg-amber-50"
            >
              {a.label}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {promises.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-brand/10 bg-white p-5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Icon className="h-5 w-5 text-amber-600" aria-hidden />
              </span>
              <h3 className="mt-3 text-base font-semibold text-brand">
                {title}
              </h3>
              <p className="mt-1 text-sm text-brand/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
