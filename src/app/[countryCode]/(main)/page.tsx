import { Metadata } from "next";

import FeaturedProducts from "@modules/home/components/featured-products";
import Hero from "@modules/home/components/hero";
import { listCollections } from "@lib/data/collections";
import { getRegion } from "@lib/data/regions";
import VideoSection from "@modules/home/components/video";
import TestimonialsSection from "@modules/home/components/testimonials";
import EinbauortSection from "@modules/home/components/einbauorte";
import OptimiertSection from "@modules/home/components/optimiert";
import FollowUsSection from "@modules/home/components/FollowUsSection";
import ProduktSection from "./hubbett-kaufen/produkte";
import BannerNeu from "/public/banner-neu.jpg";
import { Parallax } from "@modules/home/components/hero/parallax";
import Installation from "@modules/home/components/installation";
import VideoBackground from "/public/video-background.png";

export const metadata: Metadata = {
  title: "Das flexibelste Campingbett für deinen Camper",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
};

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

  return (
    <div className="bg-grey-10">
      {/* <Parallax/> */}

      <Hero />
      <VideoSection />

      <div className="relative flex content-center">
        <img
          src={VideoBackground.src}
          width={VideoBackground.width}
          height={VideoBackground.height}
          className="w-full"
        />
        <video
          src="/videos/2025.mp4"
          playsInline
          webkit-playsinline="true"
          preload="metadata"
          muted
          autoPlay
          loop
          className="absolute left-1/2 top-4 h-full -translate-x-1/2 transform pb-10 xl:pb-40"
        />
      </div>

      <TestimonialsSection />

      <ProduktSection bannerSrc={BannerNeu.src} countryCode={countryCode}>
        <h2>
          Neue Serie,
          <br />
          Neue Bettarten
        </h2>
      </ProduktSection>

      {/* <EinbauortSection /> */}

      <OptimiertSection />

      <Installation />

      {/* <FollowUsSection/> */}
    </div>
  );
}
