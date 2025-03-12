import { Metadata } from "next";
import { notFound } from "next/navigation";
import { listProducts } from "@lib/data/products";
import { getRegion, listRegions, retrieveRegion } from "@lib/data/regions";
import ProductTemplate from "@modules/products/templates";
import { getCollectionByHandle } from "@lib/data/collections";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ countryCode: string; handle: string; locale: string }>;
};

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    );

    if (!countryCodes) {
      return [];
    }

    const products = await listProducts({
      countryCode: "US",
      queryParams: { fields: "handle" },
    }).then(({ response }) => response.products);

    return countryCodes
      .map((countryCode) =>
        products.map((product) => ({
          countryCode,
          handle: product.handle,
        }))
      )
      .flat()
      .filter((param) => param.handle);
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    );
    return [];
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle, countryCode, locale } = await props.params;

  const product = await listProducts({
    countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0]);

  if (!product) {
    notFound();
  }

  const t = await getTranslations("products");
  const title = locale === "de" ? product.title : t(`${product.handle}.title`);
  const description =
    locale === "de"
      ? (product.description ?? "")
      : t(`${product.handle}.description`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const region = await getRegion(params.countryCode);

  if (!region) {
    notFound();
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    regionId: region.id,
    queryParams: {
      handle: params.handle,
    },
  }).then(({ response }) => response.products[0]);

  if (!pricedProduct) {
    notFound();
  }

  const accessories = await listProducts({
    countryCode: params.countryCode,
    regionId: region.id,
    queryParams: {
      collection_id: process.env.NEXT_PUBLIC_ACCESSORY_COLLECTION_ID,
    },
  }).then(({ response }) => response.products);

  if (!accessories) {
    notFound();
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      accessoires={accessories}
      regions={await listRegions()}
      // region={region}
      // countryCode={params.countryCode}
    />
  );
}
