import { Dialog, Transition, Select } from "@headlessui/react"; // Added Select import if necessary
import { Button, clx, Select as SelectUI } from "@medusajs/ui";
import React, { Fragment, useMemo, useState } from "react";

import useToggleState from "@lib/hooks/use-toggle-state";
import ChevronDown from "@modules/common/icons/chevron-down";
import X from "@modules/common/icons/x";

import OptionSelect from "./option-select";
import { HttpTypes } from "@medusajs/types";
import {
  getCheapestVariantPricing,
  getTotalPricing,
} from "@lib/util/get-product-price"; // New imports

type MobileActionsProps = {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
  options: Record<string, string | undefined>;
  updateOptions: (title: string, value: string) => void;
  inStock?: boolean;
  handleAddToCart: () => void;
  isAdding?: boolean;
  show: boolean;
  optionsDisabled: boolean;
  accessoryProducts?: HttpTypes.StoreProduct[]; // New accessoryProducts prop
};

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
  accessoryProducts,
}) => {
  const { state, open, close } = useToggleState();

  // Local state for accessory variants selection
  const [selectedAccessoryVariants, setSelectedAccessoryVariants] = useState<
    Record<string, string>
  >({});

  // New: Compute pricing the same way as in desktop version
  const productsForPrice =
    accessoryProducts && accessoryProducts.length > 0
      ? [product, ...accessoryProducts]
      : [product];
  const variantIdsForPrice =
    accessoryProducts && accessoryProducts.length > 0
      ? [
          variant?.id || "",
          ...accessoryProducts.map(
            (accessory) => selectedAccessoryVariants[accessory.id] || ""
          ),
        ]
      : [variant?.id || ""];

  const price = useMemo(() => {
    if (accessoryProducts && accessoryProducts.length > 0) {
      return getTotalPricing({
        products: productsForPrice,
        variantIds: variantIdsForPrice,
      });
    }
    return getCheapestVariantPricing(product);
  }, [product, accessoryProducts, variant, selectedAccessoryVariants]);

  // Remove old price fetching logic
  // ...existing code for header UI...
  return (
    <>
      <div
        className={clx("fixed inset-x-0 bottom-0 lg:hidden", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="text-large-regular flex h-full w-full flex-col items-center justify-center gap-y-3 border-t border-gray-200 bg-white p-4"
            data-testid="mobile-actions"
          >
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2">
                <span data-testid="mobile-title">{product.title}</span>
                {price && (
                  <div className="flex items-end gap-x-2 text-ui-fg-base">
                    {price.discount_percent > 0 && (
                      <p>
                        <span className="text-small-regular line-through">
                          {price.original_brutto_format}
                        </span>
                      </p>
                    )}
                    <span
                      className={clx({
                        "text-ui-fg-interactive": price.discount_percent > 0,
                      })}
                    >
                      {price.brutto_format}
                    </span>
                  </div>
                )}
              </div>
              {/* NEW: Accessory dropdowns displayed outside the popup */}
              {accessoryProducts && accessoryProducts.length > 0 && (
                <div className="flex flex-col gap-y-4">
                  {accessoryProducts.map((accessory) => (
                    <div key={accessory.id} className="flex flex-col gap-y-1">
                      <span className="text-sm">{`${accessory.title} auswählen`}</span>
                      <SelectUI
                        value={selectedAccessoryVariants[accessory.id] || ""}
                        onValueChange={(value: string) =>
                          setSelectedAccessoryVariants((prev) => ({
                            ...prev,
                            [accessory.id]: value,
                          }))
                        }
                      >
                        <SelectUI.Trigger className="text-sm">
                          <SelectUI.Value placeholder="Nicht mitbestellen" />
                        </SelectUI.Trigger>
                        <SelectUI.Content>
                          {accessory.variants?.map((variant) => (
                            <SelectUI.Item key={variant.id} value={variant.id}>
                              {variant.title}{" "}
                              {variant.calculated_price &&
                                `(+${variant.calculated_price.calculated_amount})`}
                            </SelectUI.Item>
                          ))}
                        </SelectUI.Content>
                      </SelectUI>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid w-full grid-cols-2 gap-x-4">
              <Button
                onClick={open}
                variant="secondary"
                className="w-full"
                data-testid="mobile-actions-button"
              >
                <div className="flex w-full items-center justify-between">
                  <span>
                    {variant
                      ? Object.values(options).join(" / ")
                      : "Größe auswählen"}
                  </span>
                  <ChevronDown />
                </div>
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={!inStock || !variant}
                className="w-full"
                isLoading={isAdding}
                data-testid="mobile-cart-button"
              >
                {!variant
                  ? "Bitte Variante auswählen"
                  : !inStock
                    ? "Ausverkauft"
                    : "Jetzt bestellen"}
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-x-0 bottom-0">
            <div className="flex h-full min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel
                  className="flex h-full w-full transform flex-col gap-y-3 overflow-hidden text-left"
                  data-testid="mobile-actions-modal"
                >
                  <div className="flex w-full justify-end pr-6">
                    <button
                      onClick={close}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ui-fg-base"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="bg-white px-6 py-12">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {(product.options || []).map((option) => (
                          <div key={option.id}>
                            <OptionSelect
                              option={option}
                              current={options[option.title ?? ""]}
                              updateOption={updateOptions}
                              title={option.title ?? ""}
                              disabled={optionsDisabled}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileActions;
