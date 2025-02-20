import { Metadata } from "next";

import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

import Banner from "/public/das-hubbett-für-dich.jpg";
import TestimonialsSection from "@modules/home/components/testimonials";
import ProduktSection from "./produkte";

export const metadata: Metadata = {
  title: "Hubbetten kaufen für jede Situation & jeden Einbauort | Van7 Shop",
  description:
    "Entdecke die besten Hubbetten für jede Einbausituation: Kingsize, Querschläfer, Längshubbett, Cockpit oder Stock Hubbett. Platzsparend, stabil & bequem - für höchsten Schlafkomfort unterwegs. Jetzt das perfekte Hubbett finden!",
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
  // const searchParams = await props.searchParams
  // const { sortBy, page } = searchParams

  return (
    <div className="flex flex-col">
      <ProduktSection bannerSrc={Banner.src} countryCode={countryCode}>
        <h1>
          Entdecke
          <br />
          das beste
          <br />
          Hubbett für dich
        </h1>
      </ProduktSection>

      <TestimonialsSection />
    </div>
  );
}
