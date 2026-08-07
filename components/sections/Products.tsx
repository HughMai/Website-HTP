import { ProductCategoryRow } from "@/components/ProductCategoryRow";
import { PRODUCT_CATEGORIES } from "@/lib/site-data";

export function Products() {
  return (
    <section
      id="san-pham"
      className="relative bg-gray-50 py-14 md:py-20"
      aria-labelledby="products-heading"
    >
      <div className="container">
        {/* Section intro */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Dòng Sản Phẩm
          </span>
          <h2
            id="products-heading"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-brand md:text-4xl"
          >
            Cửa nào phù hợp công trình của bạn?
          </h2>
          <p className="mt-4 text-base text-brand/70">
            Mỗi tấm hình dưới đây là một công trình Hưng Thành Phát đã lắp tại
            Cần Thơ — bấm vào để xem trọn bộ ảnh của công trình đó.
          </p>
        </div>

        {/* Category blocks */}
        <div className="mt-12 space-y-14">
          {PRODUCT_CATEGORIES.map((cat) => (
            <ProductCategoryRow key={cat.id} category={cat} showSubtypes={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
