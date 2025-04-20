import Hero from "@modules/home/components/hero";
import VideoSection from "@modules/home/components/video";
import TestimonialsSection from "@modules/home/components/testimonials";
import OptimiertSection from "@modules/home/components/optimiert";
import Installation from "@modules/home/components/installation";
import VideoBackground from "/public/video-background.png";
import Kontakt from "@modules/home/components/kontakt";
import ProductsSection from "@modules/home/components/products";
import { listProducts } from "@lib/data/products";
import { getTranslations } from "next-intl/server";

import StufenlosIcon from "/public/icons/funktionen/stufenlos.svg";
import WaagrechtIcon from "/public/icons/funktionen/waagrecht.svg";
import StabilFixiertIcon from "/public/icons/funktionen/stabil-fixiert.svg";
import LattenrostIcon from "/public/icons/funktionen/lattenrost.svg";
import NachhaltigkeitSection from "@modules/home/components/nachhaltigkeit";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home(props: {
  params: Promise<{ countryCode: string; locale: string }>;
}) {
  const params = await props.params;
  const { countryCode, locale } = params;

  // const region = await getRegion(countryCode)

  // const { collections } = await listCollections({
  //   fields: "id, handle, title",
  // })

  // if (!collections || !region) {
  //   return null
  // }

  let {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      collection_id: process.env.NEXT_PUBLIC_HUBBETT_COLLECTION_ID,
    },
  });

  const features = await getTranslations("home.features");
  const productIntl = await getTranslations("products");

  const videoProducts = {
    "stock-hubbett": 30,
    "kingsize-hubbett-mit-lattenrostauszug": 51,
    "querschlaefer-hubbett": 72,
    "cockpit-hubbett": 92,
  } as Record<string, number>;

  return (
    <div className="bg-grey-10">
      {/* <Parallax /> */}

      <Hero />
      <div className="flex flex-col gap-y-10 bg-grey-10 py-10 sm:px-10 lg:px-12 2xl:px-24 xlarge:px-40">
        <VideoSection
          sections={[
            {
              title: features("setHeight.title"),
              text: features("setHeight.text"),
              icon: <StufenlosIcon />,
              timestamp: 7.5,
            },
            {
              title: features("levelOut.title"),
              text: features("levelOut.text"),
              icon: <WaagrechtIcon />,
              timestamp: 16,
            },
            {
              title: features("fix.title"),
              text: features("fix.text"),
              icon: <StabilFixiertIcon />,
              timestamp: 28,
            },
            {
              title: features("extend.title"),
              text: features("extend.text"),
              icon: <LattenrostIcon />,
              timestamp: 31,
            },
          ]}
          videoSrc="/videos/NeueSerie.mp4"
        />

        <VideoSection
          sections={Object.entries(videoProducts).map(
            ([handle, timestamp]) => ({
              title: productIntl(`${handle}.name`),
              text:
                locale === "de"
                  ? (products.find((p) => p.handle === handle)?.description ??
                    "")
                  : productIntl(`${handle}.description`),
              timestamp: timestamp,
            })
          )}
          videoSrc={`/videos/${locale === "de" ? "hubbetten" : "liftbeds"}.mp4`}
          className="lg:flex-row-reverse"
        />
      </div>

      <TestimonialsSection />

      <ProductsSection products={products} />

      {/* <EinbauortSection /> */}

      <OptimiertSection />

      <NachhaltigkeitSection />

      <Installation />

      <Kontakt />

      {/* <FollowUsSection/> */}
    </div>
  );
}
