import { Metadata } from "next";

import { listCartOptions, retrieveCart } from "@lib/data/cart";
import { retrieveCustomer } from "@lib/data/customer";
import { getBaseURL } from "@lib/util/env";
import { StoreCartShippingOption } from "@medusajs/types";
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner";
import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge";
import { listRegions } from "@lib/data/regions";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export async function generateStaticParams() {
  // Get all available regions/countries
  const regions = await listRegions();
  const countries = regions
    ?.map((r) => r.countries?.map((c) => c.iso_2))
    .flat();

  // Create paths for each country with both locales (de and en)
  const paths = [];

  for (const countryCode of countries) {
    // For each country, generate a path for both German and English
    paths.push(
      {
        countryCode,
        locale: "de",
        shopProducts: "hubbett-kaufen",
      },
      {
        countryCode,
        locale: "en",
        shopProducts: "shop-liftbed",
      }
    );
  }

  return paths;
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  // const customer = await retrieveCustomer();
  // const cart = await retrieveCart();
  // let shippingOptions: StoreCartShippingOption[] = [];

  // if (cart) {
  //   const { shipping_options } = await listCartOptions();

  //   shippingOptions = shipping_options;
  // }

  return (
    <>
      <Nav />
      {/* {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )} */}

      {/* {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )} */}
      {props.children}
      <Footer />
    </>
  );
}
