"use client";

import { useLocale, useTranslations } from "next-intl";

const cardData = [
  "Transporter/\nCamper",
  "Kleinbus/Van",
  "Expeditionsmobil",
  "Wohnmobil",
  "Kofferanhänger",
  "Wohnanhänger/\nCaravan",
  "Tiny House",
  "Container",
  "Wohnraum",
];

const EinbauortSection = () => {
  const t = useTranslations("home.installation.locations");
  const locale = useLocale();

  return (
    <section className="flex w-full flex-col gap-y-20 bg-grey-90 from-grey-90 from-90% to-white to-90% px-5 py-20 max-sm:mt-5 sm:bg-gradient-to-br sm:px-10 lg:px-12 xl:h-full 2xl:px-24 xlarge:px-40">
      <div className="flex flex-col gap-y-10">
        <h2 className="font-title text-5xl text-white sm:text-6xl">
          {t("title")}
        </h2>
        {/* <p className="mt-4 max-w-2xl text-lg text-white sm:text-xl">
          Wähle dein Fahrzeug oder Einbauort aus der Liste aus und entdecke, wie
          sich das Hubbett nahtlos integrieren lässt.
        </p> */}
      </div>

      <div className="z-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap">
        {cardData.map((ort, index) => {
          const slug = ort.toLowerCase().replace(/[\s/]+/g, "-");
          const name = locale === "de" ? ort : t(`options.${slug}`);
          return (
            <div
              key={index}
              className="w-full flex-shrink-0 overflow-hidden rounded-lg bg-white pb-5 sm:w-64"
            >
              <img
                src={`/einbauorte/${slug}.png`}
                alt={name}
                className="w-full object-cover sm:h-[262px]"
              />
              <p className="mt-4 w-full text-center text-lg font-bold uppercase sm:text-2xl">
                {name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EinbauortSection;
