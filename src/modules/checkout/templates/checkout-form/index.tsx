import { paymentInfoMap } from "@lib/constants";
import { listCartPaymentMethods } from "@lib/data/payment";
import { HttpTypes } from "@medusajs/types";
import Addresses from "@modules/checkout/components/addresses";
import Payment from "@modules/checkout/components/payment";
import Review from "@modules/checkout/components/review";

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) {
  if (!cart) {
    return null;
  }

  const paymentMethods = await listCartPaymentMethods(
    cart.region?.id ?? ""
  ).then((result) =>
    result?.filter(
      (pp) =>
        paymentInfoMap[pp.id].allowedCountries?.includes(
          cart.shipping_address?.country_code ?? ""
        ) ?? true
    )
  );

  if (!paymentMethods) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      {/* <Shipping cart={cart} availableShippingMethods={shippingMethods} /> */}

      <Payment cart={cart} availablePaymentMethods={paymentMethods} />

      <Review cart={cart} />
    </div>
  );
}
