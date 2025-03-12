import { retrieveCart } from "@lib/data/cart";
import { retrieveCustomer } from "@lib/data/customer";
import CartTemplate from "@modules/cart/templates";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log(locale);
  const t = await getTranslations({ locale, namespace: "cart" });

  return {
    title: t("title"),
  };
}

export default async function Cart() {
  const cart = await retrieveCart();
  const customer = await retrieveCustomer();

  if (!cart) {
    return notFound();
  }

  return <CartTemplate cart={cart} customer={customer} />;
}
