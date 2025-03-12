"use client";

import { Heading, Text, clx } from "@medusajs/ui";

import PaymentButton from "../payment-button";
import { useSearchParams } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useTranslations } from "next-intl";

const Review = ({ cart }: { cart: any }) => {
  const t = useTranslations("checkout.review");
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
          {t("heading")}
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="mb-6 flex w-full items-start gap-x-1">
            <div className="w-full">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                {t("confirmation_text")}{" "}
                <LocalizedClientLink href="agb" className="link">
                  {t("terms_and_conditions")}
                </LocalizedClientLink>{" "}
                {t("and")}{" "}
                <LocalizedClientLink href="widerrufsbelehrung" className="link">
                  {t("cancellation_policy")}
                </LocalizedClientLink>{" "}
                {t("read_understood_accepted")}{" "}
                <LocalizedClientLink href="datenschutz" className="link">
                  {t("privacy_policy")}
                </LocalizedClientLink>{" "}
                {t("read_by_van7")}
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
