"use client";

import { addToCart } from "@lib/data/cart";
import { useIntersection } from "@lib/hooks/use-in-view";
import { HttpTypes } from "@medusajs/types";
import { Button, Select } from "@medusajs/ui";
import Divider from "@modules/common/components/divider";
import OptionSelect from "@modules/products/components/product-actions/option-select";
import { isEqual } from "lodash";
import { useRouter, useParams } from "next/navigation"; // Modified import
import { useEffect, useMemo, useRef, useState } from "react";
import ProductPrice from "../product-price";
import MobileActions from "./mobile-actions";

type ProductActionsProps = {
  product: HttpTypes.StoreProduct;
  accessoryProducts: HttpTypes.StoreProduct[];
  disabled?: boolean;
};

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

export default function ProductActions({
  product,
  accessoryProducts,
  disabled,
}: ProductActionsProps) {
  const router = useRouter(); // Added router
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  );
  const [isAdding, setIsAdding] = useState(false);
  const countryCode = useParams().countryCode as string;

  const [selectedAccessoryVariants, setSelectedAccessoryVariants] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options);
      setOptions(variantOptions ?? {});
    }
  }, [product.variants]);

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return;
    }
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true;
    }
    if (selectedVariant?.allow_backorder) {
      return true;
    }
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true;
    }
    return false;
  }, [selectedVariant]);

  const actionsRef = useRef<HTMLDivElement>(null);
  const inView = useIntersection(actionsRef, "0px");

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null;
    setIsAdding(true);

    // Add the main product variant
    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    });

    // Add accessory variants if selected using a for-of loop to await each request
    for (const accessory of accessoryProducts) {
      const accessoryVariantId = selectedAccessoryVariants[accessory.id];
      if (accessoryVariantId) {
        await addToCart({
          variantId: accessoryVariantId,
          quantity: 1,
          countryCode,
        });
      }
    }

    setIsAdding(false);
    router.push(`/${countryCode}/checkout`);
  };

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                );
              })}

              {accessoryProducts && accessoryProducts.length > 0 && (
                <div className="flex flex-col gap-y-4">
                  {accessoryProducts.map((accessory) => (
                    <div key={accessory.id} className="flex flex-col gap-y-3">
                      <span>{`${accessory.title} auswählen`}</span>
                      <Select
                        value={selectedAccessoryVariants[accessory.id] || ""}
                        onValueChange={(value: string) =>
                          setSelectedAccessoryVariants((prev) => ({
                            ...prev,
                            [accessory.id]: value,
                          }))
                        }
                      >
                        <Select.Trigger className="text-sm">
                          <Select.Value placeholder="Nicht mitbestellen" />
                        </Select.Trigger>
                        <Select.Content>
                          {accessory.variants?.map((variant) => (
                            <Select.Item key={variant.id} value={variant.id}>
                              {variant.title}{" "}
                              {variant.calculated_price &&
                                `(+${variant.calculated_price.calculated_amount})`}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select>
                    </div>
                  ))}
                </div>
              )}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice
          products={[product, ...accessoryProducts]}
          variantIds={[
            selectedVariant?.id || "",
            ...accessoryProducts.map(
              (accessory) => selectedAccessoryVariants[accessory.id] || ""
            ),
          ]}
        />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="h-10 w-full"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant && options
            ? "Bitte Variante auswählen"
            : !inStock || !isValidVariant
              ? "Ausverkauft"
              : "Jetzt bestellen"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
          accessoryProducts={accessoryProducts}
        />
      </div>
    </>
  );
}
