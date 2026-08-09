import Link from "next/link";
import { ProductGallery } from "@/components/ProductGallery";
import { galleryForShowcase } from "@/lib/product-gallery";
import { PRODUCT_CATEGORIES } from "@/lib/site-data";

/**
 * Real-install photo grid for a product page. Server component: it resolves the
 * category's showcase slugs here and hands <ProductGallery> a plain array.
 *
 * Renders nothing when a category has no showcase — the accessories category
 * has no photos yet, and an empty grid is worse than no section.
 */
export function ProductPhotos({
  categoryId,
  heading,
  intro,
}: {
  categoryId: string;
  heading: string;
  intro?: string;
}) {
  const category = PRODUCT_CATEGORIES.find((c) => c.id === categoryId);
  const showcase =
    category && "showcase" in category ? category.showcase : undefined;
  if (!showcase) return null;

  const items = galleryForShowcase(showcase);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-brand/10 bg-white py-16 md:py-20">
      <div className="container">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-brand md:text-3xl">
            {heading}
          </h2>
          <p className="mt-3 text-base text-brand/70">
            {intro ??
              "Bấm vào ảnh để xem lớn. Toàn bộ hình dưới đây chụp thực tế tại công trình — không phải ảnh mẫu, không phải ảnh catalogue."}
          </p>
        </div>

        <ProductGallery items={items} />

        <p className="mt-8 text-sm text-brand/60">
          Xem thêm{" "}
          <Link
            href="/cong-trinh"
            className="font-semibold text-brand underline underline-offset-4"
          >
            toàn bộ công trình đã thi công
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
