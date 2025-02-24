import { Dialog, Transition } from "@headlessui/react"; // removed unused Select import
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
import KontaktFormularDialog from "../sondermasse-dialog";
import AccessorySelect from "@modules/products/components/product-actions/accessory-select";

type MobileActionsProps = {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
  options: Record<string, string | undefined>;
  updateOptions: (title: string, value: string) => void;
  inStock?: boolean;
  isAdding?: boolean;
  show: boolean;
  optionsDisabled: boolean;
  accessoryProducts?: HttpTypes.StoreProduct[];
  handleAddToCart: () => void;
  selectedAccessoryVariants: Record<string, string>;
  onAccessoryVariantChange: (accessoryId: string, variantId: string) => void;
};

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  isAdding,
  show,
  optionsDisabled,
  accessoryProducts,
  handleAddToCart,
  selectedAccessoryVariants,
  onAccessoryVariantChange,
}) => {
  const { state, open, close } = useToggleState();

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

  // New: Wrapper to update option and close dialog if "Größe" is selected
  const handleOptionUpdate = (title: string, value: string) => {
    updateOptions(title, value);
    close();
  };

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
            {product.variants && product.variants.length > 0 ? (
              <>
                <div className="flex w-full flex-col gap-y-2">
                  <div className="flex items-center justify-between gap-x-2">
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
                            "text-ui-fg-interactive":
                              price.discount_percent > 0,
                          })}
                        >
                          {price.brutto_format}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <AccessorySelect
                  accessoryProducts={accessoryProducts}
                  selectedAccessoryVariants={selectedAccessoryVariants}
                  onAccessoryVariantChange={onAccessoryVariantChange}
                />
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
              </>
            ) : (
              <KontaktFormularDialog typ="Anfrage" />
            )}
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
                              updateOption={handleOptionUpdate}
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
