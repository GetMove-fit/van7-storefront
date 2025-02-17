import { Metadata } from "next";
import { notFound } from "next/navigation";
import { listProducts } from "@lib/data/products";
import { getRegion, listRegions, retrieveRegion } from "@lib/data/regions";
import ProductTemplate from "@modules/products/templates";

type Props = {
  params: Promise<{ countryCode: string; handle: string }>;
};

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    );

    if (!countryCodes) {
      return [];
    }

    // TODO: fix?
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
  // const params = await props.params
  // const { handle } = params
  // const region = await getRegion(params.countryCode)

  // if (!region) {
  //   notFound()
  // }

  const product = await listProducts({
    // countryCode: params.countryCode,
    // queryParams: { handle },
    regionId: process.env.NEXT_PUBLIC_REGION_ID,
  }).then(({ response }) => response.products[0]);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} | Van7 Shop`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Van7 Shop`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  // const region = await getRegion(params.countryCode)

  // if (!region) {
  //   notFound()
  // }

  const region = await retrieveRegion(process.env.NEXT_PUBLIC_REGION_ID ?? "");

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    regionId: process.env.NEXT_PUBLIC_REGION_ID,
    queryParams: {
      handle: params.handle,
    },
  }).then(({ response }) => response.products[0]);

  if (!pricedProduct) {
    notFound();
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  );
}
