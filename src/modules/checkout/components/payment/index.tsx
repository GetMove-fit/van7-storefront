"use client";

import { paymentInfoMap } from "@lib/constants";
import { initiatePaymentSession } from "@lib/data/cart";
import { CheckCircleSolid, CreditCard } from "@medusajs/icons";
import { Button, Container, Heading, Text, clx } from "@medusajs/ui";
import ErrorMessage from "@modules/checkout/components/error-message";
import { StripeContext } from "@modules/checkout/components/payment-wrapper/stripe-wrapper";
import Divider from "@modules/common/components/divider";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any;
  availablePaymentMethods: any[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripeComplete, setStripeComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const stripeReady = useContext(StripeContext);

  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  );
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

  const stripe = stripeReady ? useStripe() : null;
  const elements = stripeReady ? useElements() : null;

  const handlePaymentElementChange = async (
    event: StripePaymentElementChangeEvent
  ) => {
    if (event.value.type) {
      setSelectedPaymentMethod(event.value.type);
    }
    setStripeComplete(event.complete);

    if (event.complete) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!stripe || !elements) {
        setError("Payment processing not ready. Please try again.");
        return;
      }

      await elements.submit().catch((err) => {
        console.error(err);
        setError(err.message || "An error occurred with the payment");
        return;
      });

      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const initStripe = async () => {
    try {
      await initiatePaymentSession(cart, {
        provider_id: "pp_stripe_stripe",
      });
    } catch (err) {
      console.error("Failed to initialize Stripe session:", err);
      setError("Failed to initialize payment. Please try again.");
    }
  };

  useEffect(() => {
    if (!activeSession && isOpen) {
      initStripe();
    }
  }, [cart, isOpen, activeSession]);

  useEffect(() => {
    setError(null);
  }, [isOpen]);

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
          Zahlungsart
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-brand-content hover:text-brand-light"
              data-testid="edit-payment-button"
            >
              Bearbeiten
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard &&
            availablePaymentMethods?.length &&
            stripeReady && (
              <div className="mt-5 transition-all duration-150 ease-in-out">
                <PaymentElement
                  onChange={handlePaymentElementChange}
                  options={{
                    layout: "accordion",
                  }}
                />
              </div>
            )}
          {paidByGiftcard && (
            <div className="flex w-1/3 flex-col">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                Zahlungsart
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Geschenkkarte
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
              !stripeComplete ||
              !stripe ||
              !elements ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            Weiter zur Überprüfung
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession && selectedPaymentMethod ? (
            <div className="flex w-full items-start gap-x-1">
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                  Zahlungsart
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[selectedPaymentMethod]?.title ||
                    selectedPaymentMethod}
                </Text>
              </div>
              <div className="flex w-1/3 flex-col">
                <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                  Zahlungsdetails
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
                  <Text>Ein weiterer Schritt wird folgen</Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex w-1/3 flex-col">
              <Text className="txt-medium-plus mb-1 text-ui-fg-base">
                Zahlungsart
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Geschenkkarte
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
