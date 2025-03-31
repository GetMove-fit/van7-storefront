import React from "react";
import InteractiveVideo from "../interactive-video";
import Vorteile from "./vorteile";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Image from "next/image";

import Stars from "/public/stars.svg";
import { useTranslations } from "next-intl";
import HeroBg from "/public/hero-bg.png";

const Hero = () => {
  const t = useTranslations("home.hero");
  return (
    <section className="relative flex max-h-fit justify-between overflow-hidden max-xl:flex-col">
      <Image
        src={HeroBg}
        alt=""
        className="absolute h-full w-full object-cover object-bottom"
      />

      <div className="z-10 my-10 -mr-14 mt-16 flex flex-col gap-y-6 bg-gradient-to-br from-white/90 from-80% to-transparent to-80% px-5 py-6 sm:mt-28 sm:gap-y-10 sm:px-10 lg:ml-32 lg:mt-32 2xl:ml-40 3xl:mb-20 3xl:w-1/2">
        <div className="flex flex-col gap-y-4 text-lg sm:gap-y-6 sm:text-xl lg:text-xl 3xl:text-3xl 3xl:leading-normal">
          <div className="flex place-items-center gap-x-4 font-medium">
            <Stars className="max-sm:w-32" />
            {t("socialProof")}
          </div>

          <h1 className="whitespace-nowrap font-title text-[40px] uppercase leading-none sm:text-5xl sm:text-[60px] 2xl:text-[80px] 3xl:text-[100px]">
            {t.rich("h1", {
              br: () => <br />,
            })}
          </h1>

          <p className="hidden sm:block">
            {t.rich("context", {
              br: () => <br />,
            })}
          </p>
        </div>

        <Vorteile />

        <LocalizedClientLink
          href="hubbett-kaufen"
          className="h-fit w-fit rounded bg-gradient-to-b from-brand-light to-brand-dark px-6 py-4 font-bold uppercase leading-none text-white transition-shadow hover:shadow-lg hover:shadow-brand-highlight/30 sm:px-8 sm:py-5 sm:text-lg lg:text-xl 3xl:py-8 3xl:text-3xl"
        >
          {t("cta")}
        </LocalizedClientLink>
      </div>

      <InteractiveVideo />
    </section>
  );
};

export default Hero;
