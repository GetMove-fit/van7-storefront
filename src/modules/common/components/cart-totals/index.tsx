"use client";

import { convertToLocale } from "@lib/util/money";
import React from "react";

type CartTotalsProps = {
  totals: {
    total?: number | null;
    subtotal?: number | null;
    tax_total?: number | null;
    shipping_total?: number | null;
    discount_total?: number | null;
    gift_card_total?: number | null;
    currency_code: string;
    shipping_subtotal?: number | null;
    item_subtotal?: number | null;
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
    item_subtotal,
  } = totals;

  // Calculate tax manually if Medusa returns 0 for tax_total in tax inclusive regions.
  const netSubtotal = subtotal ? subtotal - (discount_total || 0) : 0;
  const calculatedTax = netSubtotal - netSubtotal / 1.2;

  return (
    <div>
      <div className="txt-medium flex flex-col gap-y-2 text-ui-fg-subtle">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">Zwischensumme</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span>Rabatt</span>
            <span
              className="text-brand-content"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="flex items-center gap-x-1">MwSt.</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Versand</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span>Geschenkkarte</span>
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
        <span>Gesamt</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      <div className="mt-4 h-px w-full border-b border-gray-200" />
    </div>
  );
};

export default CartTotals;
