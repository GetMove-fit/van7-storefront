import { HttpTypes } from "@medusajs/types";
import { getPercentageDiff } from "./get-precentage-diff";
import { convertToLocale } from "./money";
import { BaseCalculatedPriceSet } from "@medusajs/types/dist/http/pricing/common";
import { Pricing } from "types/global";

export function getCheapestVariantPricing(product: HttpTypes.StoreProduct) {
  if (!product || !product.variants?.length) {
    return null;
  }

  const cheapestVariant: HttpTypes.StoreProductVariant = product.variants
    .filter((v: any) => !!v.calculated_price)
    .sort((a: any, b: any) => {
      return (
        a.calculated_price.calculated_amount -
        b.calculated_price.calculated_amount
      );
    })[0];

  if (!cheapestVariant)
    return {
      brutto: 0,
      brutto_format: "",
      original_brutto: 0,
      original_brutto_format: "",
      netto: 0,
      netto_format: "",
      tax: 0,
      tax_format: "",
      tax_rate: 0,
      discount_percent: 0,
    } as Pricing;

  return transformPricing(cheapestVariant?.calculated_price!);
}

export function getVariantPricing({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct;
  variantId?: string;
}) {
  const variant = product.variants?.find(
    (v) => v.id === variantId || v.sku === variantId
  );

  return transformPricing(variant?.calculated_price!);
}

// New common function to format pricing
export function formatPricing({
  brutto,
  netto,
  originalNetto,
  currency_code,
}: {
  brutto: number;
  netto: number;
  originalNetto: number;
  currency_code: string;
}) {
  const tax = brutto - netto;
  const taxRate = getPercentageDiff(netto, brutto) * -1;
  const originalBrutto = originalNetto + (originalNetto * taxRate) / 100;
  return {
    brutto,
    brutto_format: convertToLocale({
      amount: brutto,
      currency_code,
    }),
    original_brutto: originalBrutto,
    original_brutto_format: convertToLocale({
      amount: originalBrutto,
      currency_code,
    }),
    netto,
    netto_format: convertToLocale({
      amount: netto,
      currency_code,
    }),
    original_netto: originalNetto,
    original_netto_format: convertToLocale({
      amount: originalNetto,
      currency_code,
    }),
    tax_format: convertToLocale({
      amount: tax,
      currency_code,
    }),
    tax_rate: taxRate,
    discount_percent: getPercentageDiff(originalBrutto, brutto),
  } as Pricing;
}

export function transformPricing(pricing: BaseCalculatedPriceSet) {
  const netto = pricing.calculated_amount!;
  const brutto = pricing.calculated_amount_with_tax!;
  // Delegate to formatPricing
  return formatPricing({
    brutto,
    netto,
    originalNetto: pricing.original_amount!,
    currency_code: pricing.currency_code!,
  });
}

export function getTotalPricing({
  products,
  variantIds,
}: {
  products: HttpTypes.StoreProduct[];
  variantIds: string[];
}) {
  // In the reduce, check if the variant exists and has a calculated_price.
  const { brutto, netto, originalNetto } = products.reduce(
    (acc, product, index) => {
      // Find the variant based on variantIds
      const foundVariant = product.variants?.find(
        (v) => v.id === variantIds[index]
      );
      if (!foundVariant || !foundVariant.calculated_price) {
        return acc; // skip if missing
      }
      const pricing = foundVariant.calculated_price;
      return {
        brutto: acc.brutto + (pricing.calculated_amount_with_tax || 0),
        netto: acc.netto + (pricing.calculated_amount_without_tax || 0),
        originalNetto: acc.originalNetto + (pricing.original_amount || 0),
      };
    },
    {
      brutto: 0,
      netto: 0,
      originalNetto: 0,
    }
  );
  return formatPricing({
    brutto,
    netto,
    originalNetto,
    currency_code:
      products[0].variants![0]?.calculated_price?.currency_code || "USD",
  });
}

// export function getProductPrice({
//   product,
//   variantId,
// }: {
//   product: HttpTypes.StoreProduct;
//   variantId?: string;
// }) {
//   if (!product || !product.id) {
//     throw new Error("No product provided");
//   }

//   const variantPrice = () => {
//     if (!product || !variantId) {
//       return null;
//     }

//   const variant: any = product.variants?.find(
//     (v) => v.id === variantId || v.sku === variantId
//   );

//     if (!variant) {
//       return null;
//     }

//     return getPricesForVariant(variant);
//   };

//   return {
//     product,
//     cheapestPrice: getPricesForVariant(getCheapestVariantPricing(product)),
//     variantPrice: variantPrice(),
//   };
// }
