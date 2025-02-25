import { retrieveOrder } from "@lib/data/orders";
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};
export const metadata: Metadata = {
  title: "Bestellung aufgegeben",
  description: "Deine Bestellung wurde erfolgreich aufgegeben.",
};

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  if (!order) {
    return notFound();
  }

  return <OrderCompletedTemplate order={order} />;
}
