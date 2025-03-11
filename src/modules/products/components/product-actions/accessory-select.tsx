import { Select as SelectUI } from "@medusajs/ui";
import React from "react";
import { HttpTypes } from "@medusajs/types";
import { useLocale, useTranslations } from "next-intl";

interface AccessorySelectProps {
  accessoryProducts?: HttpTypes.StoreProduct[];
  selectedAccessoryVariants: Record<string, string>;
  onAccessoryVariantChange: (accessoryId: string, variantId: string) => void;
}

export default function AccessorySelect({
  accessoryProducts,
  selectedAccessoryVariants,
  onAccessoryVariantChange,
}: AccessorySelectProps) {
  if (!accessoryProducts || accessoryProducts.length === 0) return null;

  const locale = useLocale();
  const t = useTranslations("product");

  return (
    <div className="flex w-full flex-col gap-y-4">
      {accessoryProducts.map((accessory) => (
        <div key={accessory.id} className="flex flex-col gap-y-1">
          <span className="text-sm">
            {t("selectOption", {
              option:
                locale === "de"
                  ? accessory.title
                  : t(`options.${accessory.title}`),
            })}
          </span>
          <SelectUI
            value={selectedAccessoryVariants[accessory.id] || ""}
            onValueChange={(value: string) =>
              onAccessoryVariantChange(accessory.id, value)
            }
          >
            <SelectUI.Trigger className="text-sm">
              <SelectUI.Value placeholder={t("notSelected")} />
            </SelectUI.Trigger>
            <SelectUI.Content>
              {accessory.variants?.map((variant) => (
                <SelectUI.Item key={variant.id} value={variant.id}>
                  {variant.title}{" "}
                  {variant.calculated_price &&
                    `(+${variant.calculated_price.calculated_amount}€)`}
                </SelectUI.Item>
              ))}
            </SelectUI.Content>
          </SelectUI>
        </div>
      ))}
    </div>
  );
}
