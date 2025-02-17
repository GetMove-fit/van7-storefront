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

export const metadata: Metadata = {
  title: "Das flexibelste Campingbett für deinen Camper",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
};

export default async function Home(props: {
  params: Promise<{ countryCode: string }>;
}) {
  // const params = await props.params

  // const { countryCode } = params

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

      <TestimonialsSection />

      <ProduktSection bannerSrc={BannerNeu.src}>
        <h2>
          Neue Serie,
          <br />
          Neue Bettarten
        </h2>
      </ProduktSection>

      {/* <EinbauortSection /> */}

      <OptimiertSection />

      {/* <FollowUsSection/> */}
    </div>
  );
}
