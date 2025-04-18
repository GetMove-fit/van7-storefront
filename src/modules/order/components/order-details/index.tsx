import { HttpTypes } from "@medusajs/types";
import { Text } from "@medusajs/ui";
import { useTranslations } from "next-intl";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const t = useTranslations("order");

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ");
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  };

  return (
    <div>
      <Text>
        {t.rich("confirmation", {
          email: order.email,
          b: (chunks) => (
            <span className="text-ui-fg-medium-plus font-semibold">
              {chunks}
            </span>
          ),
        })}
      </Text>
      <Text className="mt-2">
        {t("order_date")}:{" "}
        <span data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString("de-DE")}
        </span>
      </Text>
      {/* <Text className="mt-2 text-brand-content">
        {t('order_number')}: <span data-testid="order-id">{order.display_id}</span>
      </Text> */}

      <div className="text-compact-small mt-4 flex items-center gap-x-4">
        {showStatus && (
          <>
            <Text>
              {t("order_status")}:{" "}
              <span className="text-ui-fg-subtle" data-testid="order-status">
                {/* TODO: Überprüfen, woher die Statusinformationen stammen */}
                {/* {formatStatus(order.fulfillment_status)} */}
              </span>
            </Text>
            <Text>
              {t("payment_status")}:{" "}
              <span
                className="text-ui-fg-subtle"
                data-testid="order-payment-status"
              >
                {/* {formatStatus(order.payment_status)} */}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
