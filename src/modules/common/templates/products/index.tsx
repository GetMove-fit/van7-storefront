import { ReactNode } from "react";
import { StoreProduct } from "@medusajs/types";
import { clx } from "@medusajs/ui";
import ProductRail from "@modules/common/components/product-rail";
import Banner from "@modules/common/components/product-rail/banner";

type Props = {
  bannerSrc: string;
  products: StoreProduct[];
  children: ReactNode;
  className?: string;
};

export default async function ProductsTemplate({
  products,
  bannerSrc,
  children,
  className,
}: Props) {
  return (
    <div
      className={clx(
        "flex flex-col gap-y-5 bg-grey-10 p-5 sm:px-10 lg:px-20 xl:px-36",
        className
      )}
    >
      <Banner src={bannerSrc}>{children}</Banner>

      <ProductRail products={products} />
    </div>
  );
}
