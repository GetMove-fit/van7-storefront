import { StoreProduct } from "@medusajs/types";
import ProductPreview from "@modules/products/components/product-preview";

export default function ProductRail({
  products,
}: {
  products: StoreProduct[];
}) {
  return (
    <ul
      className="grid w-full grid-cols-2 gap-x-6 gap-y-8 small:grid-cols-3 medium:grid-cols-4"
      data-testid="products-list"
    >
      {products.map((p) => {
        return (
          <li key={p.id}>
            <ProductPreview product={p} />
          </li>
        );
      })}
    </ul>
  );
}
