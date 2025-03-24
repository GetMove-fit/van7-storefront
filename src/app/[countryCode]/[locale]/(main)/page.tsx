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
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;
  const { countryCode } = params;

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

  const t = await getTranslations("home");

  return (
    <div className="bg-grey-10">
      {/* <Parallax /> */}

      <Hero />
      <VideoSection
        sections={[
          {
            title: t("features.setHeight.title"),
            text: t("features.setHeight.text"),
            icon: <StufenlosIcon />,
            timestamp: 7.5,
          },
          {
            title: t("features.levelOut.title"),
            text: t("features.levelOut.text"),
            icon: <WaagrechtIcon />,
            timestamp: 16,
          },
          {
            title: t("features.fix.title"),
            text: t("features.fix.text"),
            icon: <StabilFixiertIcon />,
            timestamp: 28,
          },
          {
            title: t("features.extend.title"),
            text: t("features.extend.text"),
            icon: <LattenrostIcon />,
            timestamp: 31,
          },
        ]}
        videoSrc="/videos/NeueSerie.mp4"
      />

      <div className="relative flex h-fit place-content-center">
        <iframe
          width="1080"
          src="https://www.youtube.com/embed/RqGRhn8rhI8"
          className="z-10 mb-20 mt-4 aspect-[4/3] h-fit max-w-full sm:mb-64"
        ></iframe>
        <img
          src={VideoBackground.src}
          width={VideoBackground.width}
          height={VideoBackground.height}
          className="absolute h-full w-full object-cover"
        />
      </div>

      <TestimonialsSection />

      <ProductsSection products={products} />

      {/* <EinbauortSection /> */}

      <OptimiertSection />

      <Installation />

      <Kontakt />

      {/* <FollowUsSection/> */}
    </div>
  );
}
