import { StoreProduct } from "@medusajs/types";
import { clx } from "@medusajs/ui";
import ProductRail from "@modules/common/components/product-rail";

type Props = {
  bannerSrc: string;
  products: StoreProduct[];
  children: React.ReactNode;
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
      <div className="relative h-[33vh]">
        <img
          src={bannerSrc}
          className="h-full w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-0 p-5 font-title text-5xl uppercase leading-none text-white sm:inset-0 sm:text-8xl">
          {children}
        </div>
      </div>

      <ProductRail products={products} />
    </div>
  );
}
