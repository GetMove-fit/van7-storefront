import { Metadata } from "next";

import { getBaseURL } from "@lib/util/env";
import { StoreRegion } from "@medusajs/types";
import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";
import { listRegions } from "@lib/data/regions";
import { locales } from "@lib/constants";

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
  return countries.flatMap((countryCode) =>
    locales.map((locale) => ({ countryCode, locale }))
  );
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  // const customer = await retrieveCustomer();
  // const cart = await retrieveCart();
  // let shippingOptions: StoreCartShippingOption[] = [];

  // if (cart) {
  //   const { shipping_options } = await listCartOptions();

  //   shippingOptions = shipping_options;
  // }

  const regions: StoreRegion[] = await listRegions();

  return (
    <>
      <Nav regions={regions} />
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
