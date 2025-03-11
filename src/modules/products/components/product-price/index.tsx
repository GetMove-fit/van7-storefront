import { clx } from "@medusajs/ui";
import {
  getCheapestVariantPricing,
  getTotalPricing,
} from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import Divider from "@modules/common/components/divider";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export type ProductPriceProps = {
  products: HttpTypes.StoreProduct[]; // first product is primary
  variantIds: string[]; // corresponding variant ids
};

export default function ProductPrice({
  products,
  variantIds,
}: ProductPriceProps) {
  const cheapestPrice = getCheapestVariantPricing(products[0])!;

  // Compute pricing based on current products and variantIds using useMemo.
  const pricing = useMemo(() => {
    return variantIds[0]
      ? getTotalPricing({ products, variantIds })
      : cheapestPrice;
  }, [products, variantIds, cheapestPrice]);

  if (!pricing) {
    return <div className="block h-9 w-32 animate-pulse bg-gray-100" />;
  }

  const t = useTranslations("product.pricing");

  return (
    <div className="flex flex-col text-ui-fg-base">
      {variantIds[0] && (
        <>
          <div className="flex justify-between">
            <span>{t("netto")}:</span>
            <span>{pricing.netto_format}</span>
          </div>

          <div className="flex justify-between">
            <span>
              {t("tax")} ({cheapestPrice?.tax_rate}%):
            </span>
            <span>{pricing.tax_format}</span>
          </div>

          <Divider />
        </>
      )}

      <span
        className={clx("text-xl-semi place-self-end py-1", {
          "text-brand-content": pricing.discount_percent > 0,
        })}
      >
        {variantIds[0] ? (
          <span data-testid="product-price" data-value={pricing}>
            {pricing.brutto_format}
          </span>
        ) : (
          t("from", { price: cheapestPrice.brutto_format })
        )}
      </span>

      {pricing.discount_percent > 0 && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={pricing.original_brutto}
            >
              {pricing.original_brutto_format}
            </span>
          </p>
          <span className="text-brand-content">
            -{pricing.discount_percent}%
          </span>
        </>
      )}
    </div>
  );
}
