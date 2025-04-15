"use client";

import { isManual, isStripe, isPayever } from "@lib/constants";
import { placeOrder } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { Button } from "@medusajs/ui";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../error-message";
import { useTranslations } from "next-intl";
import { PaymentIntentResult } from "@stripe/stripe-js";

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart;
  "data-testid": string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const t = useTranslations("checkout.payment");

  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1;

  const paymentSession = cart.payment_collection?.payment_sessions?.[0];

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      );
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      );
    case isPayever(paymentSession?.provider_id):
      return (
        <PayeverPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      );
    default:
      return <Button disabled>{t("select_payment_method")}</Button>;
  }
};

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart;
  notReady: boolean;
  "data-testid"?: string;
}) => {
  const t = useTranslations("checkout.payment");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { countryCode } = useParams();

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (session) => session.provider_id.startsWith("pp_stripe")
  );
  console.log(paymentSession);

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const stripe = useStripe();
  const elements = useElements();

  const disabled = !stripe || !elements ? true : false;

  const handlePayment = async () => {
    if (!stripe || !elements || !cart) {
      return;
    }

    setSubmitting(true);

    const clientSecret = paymentSession?.data?.client_secret as string;
    const return_url = `${window.location.origin}/api/capture-payment/${cart.id}?country_code=${countryCode}`;
    const billing_details = {
      name:
        cart.billing_address?.first_name +
        " " +
        cart.billing_address?.last_name,
      address: {
        city: cart.billing_address?.city ?? undefined,
        country: cart.billing_address?.country_code ?? undefined,
        line1: cart.billing_address?.address_1 ?? undefined,
        line2: cart.billing_address?.address_2 ?? undefined,
        postal_code: cart.billing_address?.postal_code ?? undefined,
        state: cart.billing_address?.province ?? undefined,
      },
      email: cart.email,
      phone: cart.billing_address?.phone ?? undefined,
    };

    let result: PaymentIntentResult | undefined;

    switch (paymentSession?.provider_id) {
      case "pp_stripe_stripe":
        const card = elements?.getElement("card");
        if (!card) break;
        result = await stripe.confirmCardPayment(clientSecret, {
          return_url,
          payment_method: {
            card,
            billing_details,
          },
        });
        break;
      case "pp_stripe_eps":
        const epsBank = elements?.getElement("epsBank");
        if (!epsBank) break;
        result = await stripe.confirmEpsPayment(clientSecret, {
          return_url,
          payment_method: {
            eps: epsBank,
            billing_details,
          },
        });
        break;
    }

    if (!result) {
      setSubmitting(false);
      return;
    }

    const { error, paymentIntent } = result;

    if (error) {
      const pi = error.payment_intent;

      if (
        (pi && pi.status === "requires_capture") ||
        (pi && pi.status === "succeeded")
      ) {
        onPaymentCompleted();
      }

      setErrorMessage(error.message || null);
      return;
    }

    if (
      (paymentIntent && paymentIntent.status === "requires_capture") ||
      paymentIntent.status === "succeeded"
    ) {
      return onPaymentCompleted();
    }
  };

  useEffect(() => {
    if (cart.payment_collection?.status === "authorized") {
      onPaymentCompleted();
    }
  }, [cart.payment_collection?.status]);

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        {t("place_order")}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  );
};

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const t = useTranslations("checkout.payment");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handlePayment = () => {
    setSubmitting(true);

    onPaymentCompleted();
  };

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        {t("place_order")}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  );
};

const PayeverPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart;
  notReady: boolean;
  "data-testid"?: string;
}) => {
  const t = useTranslations("checkout.payment");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { countryCode } = useParams();

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (session) => session.provider_id.startsWith("pp_payever")
  );

  const handlePayment = () => {
    setSubmitting(true);

    // Redirect to Payever checkout URL if available
    if (paymentSession?.data?.checkout_url) {
      window.location.href = paymentSession.data.checkout_url as string;
    } else {
      // If no checkout URL is available, attempt to place the order directly
      placeOrder()
        .catch((err) => {
          setErrorMessage(err.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid={dataTestId || "payever-payment-button"}
      >
        {t("place_order")}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="payever-payment-error-message"
      />
    </>
  );
};

export default PaymentButton;
