import React from "react";
import InteractiveVideo from "../interactive-video";
import Vorteile from "./vorteile";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

import Stars from "/public/stars.svg";
import Trees from "/public/trees.svg";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("home.hero");
  return (
    <section className="relative flex justify-between overflow-hidden pl-5 max-xl:flex-col sm:pl-10 lg:max-h-screen lg:pl-32 2xl:pl-48">
      <Trees className="absolute left-0 top-40 max-lg:hidden max-sm:bottom-0 max-sm:place-self-end" />
      <div className="z-10 flex flex-col gap-y-6 py-6 sm:gap-y-10 sm:py-10">
        <div className="flex flex-col gap-y-4 text-lg sm:gap-y-6 sm:text-xl lg:text-xl 3xl:text-3xl 3xl:leading-normal">
          <div className="flex place-items-center gap-x-4 font-medium">
            <Stars className="max-sm:w-32" />
            {t("socialProof")}
          </div>

          <h1 className="whitespace-nowrap font-title text-[40px] uppercase leading-none sm:text-5xl sm:text-[60px] 2xl:text-[80px] 3xl:text-9xl">
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
