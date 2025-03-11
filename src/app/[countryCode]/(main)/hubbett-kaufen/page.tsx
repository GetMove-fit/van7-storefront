import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

import Banner from "/public/das-hubbett-für-dich.jpg";
import TestimonialsSection from "@modules/home/components/testimonials";
import ProductsTemplate from "@modules/common/templates/products";
import { listProducts } from "@lib/data/products";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("shop.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

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

  const t = await getTranslations("shop");

  return (
    <div className="flex flex-col">
      <ProductsTemplate
        bannerSrc={Banner.src}
        products={products}
        className="pb-20 pt-5"
      >
        <h1>
          {t.rich("title", {
            br: () => <br />,
          })}
        </h1>
      </ProductsTemplate>

      <TestimonialsSection />
    </div>
  );
}
