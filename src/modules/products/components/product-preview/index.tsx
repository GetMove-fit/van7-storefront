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
    <LocalizedClientLink href={`/produkt/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="square"
          isFeatured={isFeatured}
        />

        <div className="mt-4 flex justify-between max-sm:flex-col sm:items-end">
          <p className="font-title text-xl uppercase leading-none text-grey-90 sm:text-3xl">
            {product.title}
          </p>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
}
