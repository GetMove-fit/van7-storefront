import React from "react";
import { CreditCard } from "@medusajs/icons";

import Ideal from "@modules/common/icons/ideal";
import Bancontact from "@modules/common/icons/bancontact";
import PayPal from "@modules/common/icons/paypal";
import Bank from "@modules/common/icons/bank";
import EPS from "@modules/common/icons/eps";
import Santander from "@modules/common/icons/santander";

export const locales = ["en", "de", "fr", "es", "hu", "it", "nl"];

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: "Kartenzahlung",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Direkte Banküberweisung",
    icon: <Bank />,
  },
  pp_stripe_eps: {
    title: "Online-Banking-Zahlung mit EPS",
    icon: <EPS />,
  },
  pp_payever_santander: {
    title: "Zahlung mit Payever",
    icon: <Santander />,
  },
  // Add more payment providers here
};

// This only checks if it is native stripe for card payments, it ignores the other stripe-based providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe_");
};
export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal");
};
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default");
};
export const isPayever = (providerId?: string) => {
  return providerId?.startsWith("pp_payever");
};

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
];
