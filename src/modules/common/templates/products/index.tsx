import { ReactNode } from "react";
import { StoreProduct } from "@medusajs/types";
import { clx } from "@medusajs/ui";
import ProductRail from "@modules/common/components/product-rail";
import Banner from "@modules/common/components/product-rail/banner";
import { StaticImageData } from "next/image";

type Props = {
  bannerSrc: StaticImageData;
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
        "flex flex-col gap-y-10 bg-grey-10 p-5 sm:px-10 sm:pb-20 lg:px-12 2xl:px-24 xlarge:px-40",
        className
      )}
    >
      <Banner src={bannerSrc}>{children}</Banner>

      <ProductRail products={products} />
    </div>
  );
}
