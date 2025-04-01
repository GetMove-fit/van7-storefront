import { locales } from "@lib/constants";
import { listProducts } from "@lib/data/products";
import type { MetadataRoute } from "next";

const pages = ["/", "/hubbett-kaufen", "/datenschutz", "/agb", "/impressum"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts({
    countryCode: "at",
    queryParams: {
      fields: "handle",
      collection_id: process.env.NEXT_PUBLIC_HUBBETT_COLLECTION_ID,
    },
  }).then(({ response }) => response.products);
  pages.push(...products.map((product) => "/p/" + product.handle));

  return pages.map((p) => {
    const path = p === "/" ? "" : p;
    return {
      url: "https://van7.com/at/de" + path,
      lastModified: new Date(),
      alternates: {
        languages: locales.reduce(
          (acc, locale) => {
            acc[locale] = `https://van7.com/at/${locale}${path}`;
            return acc;
          },
          { "x-default": "https://van7.com/at/en" + path } as Record<
            string,
            string
          >
        ),
      },
    };
  });
}
