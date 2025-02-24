"use client";

import { Heading, Text, clx } from "@medusajs/ui";

import PaymentButton from "../payment-button";
import { useSearchParams } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("step") === "review";

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard);

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            "text-3xl-regular flex flex-row items-baseline gap-x-2",
            {
              "pointer-events-none select-none opacity-50": !isOpen,
            }
          )}
        >
          Überprüfung
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-x-1">
            <div className="w-full">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                Durch Klicken auf die Schaltfläche Bestellung aufgeben
                bestätigen Sie, dass Sie unsere{" "}
                <LocalizedClientLink href="agb" className="link">
                  AGB
                </LocalizedClientLink>{" "}
                und{" "}
                <LocalizedClientLink href="widerrufsbelehrung" className="link">
                  Widerrufsbelehrung
                </LocalizedClientLink>{" "}
                gelesen, verstanden und akzeptiert haben und bestätigen, dass
                Sie die{" "}
                <LocalizedClientLink href="datenschutz" className="link">
                  Datenschutzerklärung
                </LocalizedClientLink>{" "}
                von VAN7 gelesen haben.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  );
};

export default Review;
