"use client";

import { addToCart } from "@lib/data/cart";
import { useIntersection } from "@lib/hooks/use-in-view";
import { HttpTypes } from "@medusajs/types";
import { Button } from "@medusajs/ui";
import Divider from "@modules/common/components/divider";
import OptionSelect from "@modules/products/components/product-actions/option-select";
import { isEqual } from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductPrice from "../product-price";
import MobileActions from "./mobile-actions";

type ProductActionsProps = {
  product: HttpTypes.StoreProduct;
  region: HttpTypes.StoreRegion;
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
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  );
  const [isAdding, setIsAdding] = useState(false);
  // const countryCode = useParams().countryCode as string
  const countryCode = "at"; // TODO: fix

  // New state for montage console and LED options
  const [montageConsole, setMontageConsole] = useState("nein");
  const [consoleVariant, setConsoleVariant] = useState("");
  const [ledOption, setLedOption] = useState("none");

  // New constant for montage console option and predefined console variants
  const montageOption = {
    id: "montage_console",
    title: "Montagekonsole mitbestellen",
    values: [
      { id: "ja", value: "ja" },
      { id: "nein", value: "nein" },
    ],
  };

  const consoleVariants = [
    { id: "1", name: "Console Variante 1" },
    { id: "2", name: "Console Variante 2" },
  ];

  // If there is only 1 variant, preselect the options
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

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true;
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true;
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true;
    }

    // Otherwise, we can't add to cart
    return false;
  }, [selectedVariant]);

  const actionsRef = useRef<HTMLDivElement>(null);

  const inView = useIntersection(actionsRef, "0px");

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null;

    setIsAdding(true);

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    });

    setIsAdding(false);
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

              {/* New: Montagekonsole mit OptionSelect */}
              <div>
                <OptionSelect
                  option={montageOption}
                  current={montageConsole}
                  updateOption={(optionId, value) => setMontageConsole(value)}
                  title={montageOption.title}
                  data-testid="montage-console-option"
                  disabled={!!disabled || isAdding}
                />
              </div>

              {/* New: If "ja" selected, show predefined console variant dropdown */}
              {montageConsole === "ja" && (
                <div>
                  <label>Wähle Konsolenvariante</label>
                  <select
                    onChange={(e) => setConsoleVariant(e.target.value)}
                    value={consoleVariant}
                  >
                    <option value="">Bitte wählen</option>
                    {consoleVariants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* New: LED Optionen */}
              <div>
                <label>LED Optionen</label>
                <select
                  onChange={(e) => setLedOption(e.target.value)}
                  value={ledOption}
                >
                  <option value="none">none</option>
                  <option value="indirekt">indirekt Laderaum</option>
                  <option value="direkt_kalt">direkt kalt</option>
                  <option value="direkt_warm">direkt warm</option>
                </select>
              </div>

              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

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
              : "Zum Warenkorb hinzufügen"}
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
        />
      </div>
    </>
  );
}
