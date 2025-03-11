import { useTranslations } from "next-intl";

import BannerNeu from "/public/banner-neu.jpg";
import ProductsTemplate from "@modules/common/templates/products";
import { StoreProduct } from "@medusajs/types";

export default function ProductsSection({
  products,
}: {
  products: StoreProduct[];
}) {
  const t = useTranslations("home.products");

  return (
    <ProductsTemplate bannerSrc={BannerNeu.src} products={products}>
      <h2>
        {t.rich("title", {
          br: () => <br />,
        })}
      </h2>
    </ProductsTemplate>
  );
}
