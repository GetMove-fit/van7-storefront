import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder;
};

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return convertToLocale({
      amount,
      currency_code: order.currency_code,
    });
  };

  return (
    <div>
      <h2 className="text-base-semi">Bestellübersicht</h2>
      <div className="text-small-regular my-2 text-ui-fg-base">
        <div className="text-base-regular mb-2 flex items-center justify-between text-ui-fg-base">
          <span>Zwischensumme</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {order.discount_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Rabatt</span>
              <span>- {getAmount(order.discount_total)}</span>
            </div>
          )}
          {order.gift_card_total > 0 && (
            <div className="flex items-center justify-between">
              <span>Rabatt</span>
              <span>- {getAmount(order.gift_card_total)}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>Versand</span>
            <span>{getAmount(order.shipping_total)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Steuern</span>
            <span>{getAmount(order.tax_total)}</span>
          </div>
        </div>
        <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />

        <div className="text-base-regular mb-2 flex items-center justify-between text-ui-fg-base">
          <span>Gesamt</span>
          <span>{getAmount(order.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
