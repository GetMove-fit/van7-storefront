import { retrieveCart } from "@lib/data/cart";
import { retrieveCustomer } from "@lib/data/customer";
import PaymentWrapper from "@modules/checkout/components/payment-wrapper";
import CheckoutForm from "@modules/checkout/templates/checkout-form";
import CheckoutSummary from "@modules/checkout/templates/checkout-summary";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return {
    title: t("title"),
  };
}

export default async function Checkout() {
  const cart = await retrieveCart();

  if (!cart) {
    return notFound();
  }

  const customer = await retrieveCustomer();

  return (
    <div className="content-container grid grid-cols-1 gap-x-40 py-12 small:grid-cols-[1fr_416px]">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
      </PaymentWrapper>
      <CheckoutSummary cart={cart} />
    </div>
  );
}
