"use client";

import { paymentInfoMap } from "@lib/constants";
import {
  initiatePaymentSession,
  setBankTransferPaymentOption,
} from "@lib/data/cart";
import { CheckCircleSolid, CreditCard, Spinner, Stripe } from "@medusajs/icons";
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
import MedusaRadio from "@modules/common/components/radio";
import Bank from "@modules/common/icons/bank";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any;
  availablePaymentMethods: any[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();
  const [paymentFormValid, setPaymentFormValid] = useState(false);

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

  useEffect(() => {
    // console.log(cart.payment_collection?.payment_sessions?.[0]?.data);
    if (cart.payment_collection?.payment_sessions?.[0]?.data.bank_transfer) {
      setSelectedPaymentMethod("banküberweisung");
    }
  }, []);

  const stripe = stripeReady ? useStripe() : null;
  const elements = stripeReady ? useElements() : null;

  const handleBankTransferSelection = async () => {
    // Only process if not already selected
    if (selectedPaymentMethod !== "banküberweisung") {
      if (elements) {
        try {
          // Clear Stripe selection
          const paymentElement = elements.getElement("payment");
          if (paymentElement) {
            paymentElement.clear();
          }
        } catch (e) {
          console.error("Failed to clear payment element:", e);
        }
      }

      // Update states
      setSelectedPaymentMethod("banküberweisung");
      setPaymentFormValid(true); // Bank transfer is always valid once selected
    }
  };

  const handleOnlinePaymentSelection = () => {
    // Set initial state for online payment
    // This will cause the accordion to open, showing payment options
    if (selectedPaymentMethod === "banküberweisung") {
      setSelectedPaymentMethod(undefined);
      setPaymentFormValid(false);
    }
  };

  const handlePaymentElementChange = async (
    event: StripePaymentElementChangeEvent
  ) => {
    if (!isOpen && selectedPaymentMethod === "banküberweisung") return;

    // Ignore payment element changes during loading if bank transfer is selected
    if (
      (!activeSession || !stripeReady) &&
      selectedPaymentMethod === "banküberweisung"
    ) {
      return;
    }

    if (!!event.value.type) {
      console.log("Payment method selected:", event.value.type);
      setSelectedPaymentMethod(event.value.type);

      // If a payment method is selected, consider the form valid for submission
      // Even if Stripe doesn't consider it "complete" yet
      setPaymentFormValid(event.complete);
    } else {
      setPaymentFormValid(false);
    }

    if (event.complete) {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (selectedPaymentMethod !== "banküberweisung") {
        if (!stripe || !elements) {
          setError("Payment processing not ready. Please try again.");
          return;
        }

        await elements.submit().catch((err) => {
          console.error(err);
          setError(err.message || "An error occurred with the payment");
          return;
        });
      }

      await setBankTransferPaymentOption(
        selectedPaymentMethod === "banküberweisung"
      );

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
              className="text-brand-light hover:text-brand-highlight"
              data-testid="edit-payment-button"
            >
              Bearbeiten
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <div>
              <div
                onClick={handleBankTransferSelection}
                className={clx(
                  "mb-2 mt-4 flex cursor-pointer items-center justify-between rounded-rounded border px-4 py-3 shadow-sm",
                  {
                    "border-brand-light":
                      selectedPaymentMethod === "banküberweisung",
                  }
                )}
              >
                <div className="flex items-center gap-x-4 text-lg text-ui-fg-subtle">
                  <MedusaRadio
                    checked={selectedPaymentMethod === "banküberweisung"}
                  />
                  <Bank />
                  <p className="w-full whitespace-nowrap font-medium">
                    Direkte Banküberweisung
                  </p>
                </div>
              </div>

              <AccordionPrimitive.Root
                type="single"
                value={
                  selectedPaymentMethod !== "banküberweisung"
                    ? "Stripe"
                    : undefined
                }
              >
                <AccordionPrimitive.Item value="Stripe">
                  <AccordionPrimitive.Header>
                    <div
                      onClick={handleOnlinePaymentSelection}
                      className="mb-2 mt-4 flex cursor-pointer items-center justify-between rounded-rounded border px-4 py-3 shadow-sm radix-state-open:border-brand-light"
                    >
                      <div className="flex items-center gap-x-4 text-lg text-ui-fg-subtle">
                        <MedusaRadio
                          checked={selectedPaymentMethod !== "banküberweisung"}
                        />
                        <Stripe />
                        <p className="w-full whitespace-nowrap font-medium">
                          Sichere Online-Zahlung
                        </p>
                      </div>
                    </div>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content
                    className={clx(
                      "radix-state-closed:pointer-events-none radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open"
                    )}
                  >
                    {(!activeSession || !stripeReady) && (
                      <Spinner className="animate-spin" />
                    )}

                    {stripeReady && (
                      <PaymentElement
                        onChange={handlePaymentElementChange}
                        options={{
                          layout: "accordion",
                        }}
                      />
                    )}
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              </AccordionPrimitive.Root>
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
              (!paymentFormValid &&
                selectedPaymentMethod !== "banküberweisung") ||
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
                  {selectedPaymentMethod === "banküberweisung"
                    ? "Direkte Banküberweisung"
                    : paymentInfoMap[selectedPaymentMethod]?.title ||
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
                    {selectedPaymentMethod === "banküberweisung" ? (
                      <Bank />
                    ) : (
                      paymentInfoMap[selectedPaymentMethod]?.icon || (
                        <CreditCard />
                      )
                    )}
                  </Container>
                  <Text>
                    {selectedPaymentMethod === "banküberweisung"
                      ? "Du erhältst die Rechnung worauf die Bankdaten ersichtlich sind"
                      : "Ein weiterer Schritt wird folgen"}
                  </Text>
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
