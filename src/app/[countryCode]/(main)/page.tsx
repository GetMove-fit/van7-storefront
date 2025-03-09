import { Metadata } from "next";

import Hero from "@modules/home/components/hero";
import VideoSection from "@modules/home/components/video";
import TestimonialsSection from "@modules/home/components/testimonials";
import OptimiertSection from "@modules/home/components/optimiert";
import ProduktSection from "./hubbett-kaufen/produkte";
import BannerNeu from "/public/banner-neu.jpg";
import { Parallax } from "@modules/home/components/hero/parallax";
import Installation from "@modules/home/components/installation";
import VideoBackground from "/public/video-background.png";
import Kontakt from "@modules/home/components/kontakt";

export const metadata: Metadata = {
  title: "Das flexibelste Hubbett Wohnmobil und Kastenwagen | VAN7",
  description:
    "Entdecke das Hubbett mit höchstem Komfort und optimaler Raumnutzung für Camper, Transporter, Wohnmobile oder Anhänger. Nie wieder schief schlafen und den Raum bestmöglich nutzen.",
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
      {/* <Parallax /> */}

      <Hero />
      <VideoSection />

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

      <ProduktSection bannerSrc={BannerNeu.src} countryCode={countryCode}>
        <h2>
          Neue Serie,
          <br />
          Neue Ausbaukonzepte
        </h2>
      </ProduktSection>

      {/* <EinbauortSection /> */}

      <OptimiertSection />

      <Installation />

      <Kontakt />

      {/* <FollowUsSection/> */}
    </div>
  );
}
