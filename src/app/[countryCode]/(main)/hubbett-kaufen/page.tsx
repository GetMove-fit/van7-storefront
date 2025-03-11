import { Metadata } from "next";

import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

import Banner from "/public/das-hubbett-für-dich.jpg";
import TestimonialsSection from "@modules/home/components/testimonials";
import ProductsTemplate from "@modules/common/templates/products";
import { listProducts } from "@lib/data/products";

export const metadata: Metadata = {
  title: "Hubbett kaufen für jede Situation & jeden Einbauort | VAN7 Shop",
  description:
    "Entdecke Hubbetten für jede Einbausituation: Kingsize, Querschläfer, Längshubbett, Cockpit oder Stock Hubbett. Platzsparend, stabil & bequem - für höchsten Schlafkomfort unterwegs. Jetzt das perfekte Hubbett finden!",
};

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
  params: Promise<{
    countryCode: string;
  }>;
};

export default async function StorePage(props: Params) {
  const { countryCode } = await props.params;

  let {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      collection_id: process.env.NEXT_PUBLIC_HUBBETT_COLLECTION_ID,
    },
  });

  return (
    <div className="flex flex-col">
      <ProductsTemplate
        bannerSrc={Banner.src}
        products={products}
        className="pb-20 pt-5"
      >
        <h1>
          Entdecke
          <br />
          das beste
          <br />
          Hubbett für dich
        </h1>
      </ProductsTemplate>

      <TestimonialsSection />
    </div>
  );
}
