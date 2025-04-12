"use client";

import { RadioGroup } from "@headlessui/react";
import {
  isManual,
  isStripe as isStripeFunc,
  paymentInfoMap,
} from "@lib/constants";
import { initiatePaymentSession } from "@lib/data/cart";
import { CheckCircleSolid, CreditCard } from "@medusajs/icons";
import { Button, Container, Heading, Text, clx } from "@medusajs/ui";
import ErrorMessage from "@modules/checkout/components/error-message";
import PaymentContainer, {
  StripeCardContainer,
  StripeEpsContainer,
} from "@modules/checkout/components/payment-container";
import Divider from "@modules/common/components/divider";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any;
  availablePaymentMethods: any[];
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const isStripe = isStripeFunc(selectedPaymentMethod);

  const setPaymentMethod = async (method: string) => {
    setError(null);
    setSelectedPaymentMethod(method);
    if (isStripeFunc(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      });
    }
  };

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0;

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const shouldInputCard =
        isStripeFunc(selectedPaymentMethod) && !activeSession;

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod;

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        });
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const t = useTranslations("checkout.payment");

  return (
    <div className="bg-white">
      <div className="mb-6 flex flex-row items-center justify-between">
        <Heading
          level="h2"
          className={clx(
            "text-3xl-regular flex flex-row items-baseline gap-x-2",
            {
              "pointer-events-none select-none opacity-50":
                !isOpen && !paymentReady,
            }
          )}
        >
          {t("heading")}
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-brand-light hover:text-brand-highlight"
              data-testid="edit-payment-button"
            >
              {t("edit")}
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    {isStripeFunc(paymentMethod.id) ? (
                      paymentMethod.id === "pp_stripe_eps" ? (
                        <StripeEpsContainer
                          paymentProviderId={paymentMethod.id}
                          selectedPaymentOptionId={selectedPaymentMethod}
                          paymentInfoMap={paymentInfoMap}
                          setCardBrand={setCardBrand}
                          setError={setError}
                          setCardComplete={setCardComplete}
                        />
                      ) : (
                        <StripeCardContainer
                          paymentProviderId={paymentMethod.id}
                          selectedPaymentOptionId={selectedPaymentMethod}
                          paymentInfoMap={paymentInfoMap}
                          setCardBrand={setCardBrand}
                          setError={setError}
                          setCardComplete={setCardComplete}
                        />
                      )
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </>
          )}

          {paidByGiftcard && (
            <div className="flex w-1/3 flex-col">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                {t("payment_method")}
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                {t("gift_card")}
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripe && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {t("continue_to_review")}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex w-full items-start gap-x-1">
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                  {t("payment_method")}
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {t(`methods.${activeSession.provider_id}`)}
                </Text>
              </div>
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                  {t("payment_details")}
                </Text>
                <div
                  className="txt-medium flex items-center gap-2 text-ui-fg-subtle"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex h-7 w-fit items-center bg-ui-button-neutral-hover p-2">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {isManual(selectedPaymentMethod)
                      ? t("bank_transfer_details")
                      : isStripeFunc(selectedPaymentMethod) && cardBrand
                        ? cardBrand
                        : t("online_payment_details")}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex w-1/3 flex-col">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                {t("payment_method")}
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                {t("gift_card")}
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  );
};

export default Payment;
