"use client";

import { convertToLocale } from "@lib/util/money";
import { useTranslations } from "next-intl";
import React from "react";

type CartTotalsProps = {
  totals: {
    subtotal?: number | null;
    total?: number | null;
    item_subtotal?: number | null;
    tax_total?: number | null;
    shipping_subtotal?: number | null;
    discount_subtotal?: number | null;
    gift_card_total?: number | null;
    currency_code: string;
    metadata?: {
      vat_id?: string;
    };
    billing_address?: {
      country_code?: string;
    };
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    subtotal,
    total,
    item_subtotal,
    tax_total,
    shipping_subtotal,
    discount_subtotal,
    gift_card_total,
    currency_code,
    metadata,
    billing_address,
  } = totals;

  const t = useTranslations("cart.totals");
  const isTaxReverseCharge =
    !!metadata?.vat_id && billing_address?.country_code !== "at";

  return (
    <div>
      <div className="txt-medium flex flex-col gap-y-2 text-ui-fg-subtle">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">{t("subtotal")}</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t("shipping")}</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>{t("discount")}</span>
            <span
              className="text-brand-content"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        {!isTaxReverseCharge && (
          <div className="flex justify-between">
            <span className="flex items-center gap-x-1">{t("tax")}</span>
            <span data-testid="cart-taxes" data-value={tax_total || 0}>
              {convertToLocale({ amount: tax_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>{t("giftCard")}</span>
            <span
              className="text-brand-content"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>
      <div className="my-4 h-px w-full border-b border-gray-200" />

      <div className="txt-medium mb-2 flex items-center justify-between text-ui-fg-base">
        <span>{t("total")}</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({
            amount: isTaxReverseCharge ? subtotal : (total ?? 0),
            currency_code,
          })}
        </span>
      </div>
      <div className="mt-4 h-px w-full border-b border-gray-200" />
    </div>
  );
};

export default CartTotals;
