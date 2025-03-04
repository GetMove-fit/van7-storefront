import { HttpTypes } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";
import { getCheapestVariantPricing } from "@lib/util/get-product-price";

export default async function ProductPreview({
  product,
  isFeatured,
}: // region,
{
  product: HttpTypes.StoreProduct;
  isFeatured?: boolean;
  // region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const cheapestPrice = getCheapestVariantPricing(product);

  return (
    <LocalizedClientLink
      href={`produkt/${product.handle}`}
      className="group flex h-full flex-col gap-y-4"
    >
      <Thumbnail
        thumbnail={product.thumbnail}
        images={product.images}
        size="square"
        isFeatured={isFeatured}
      />

      <div className="flex grow flex-col justify-between">
        <p className="w-full font-title text-xl leading-none text-grey-90 group-hover:text-brand-content sm:text-3xl">
          {product.title}
        </p>
        {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
      </div>
    </LocalizedClientLink>
  );
}
