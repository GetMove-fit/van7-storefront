"use client";

import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";
import Camper from "/public/einbauorte/transporter-camper.png";
import Kleinbus from "/public/einbauorte/kleinbus-van.png";
import Expeditionsmobil from "/public/einbauorte/expeditionsmobil.png";
import Wohnmobil from "/public/einbauorte/wohnmobil.png";
import Kofferanhaenger from "/public/einbauorte/kofferanhaenger.png";
import Wohnanhaenger from "/public/einbauorte/wohnanhaenger-caravan.png";
import TinyHouse from "/public/einbauorte/tiny-house.png";
import Container from "/public/einbauorte/container.png";
import Wohnraum from "/public/einbauorte/wohnraum.png";

const cardData = {
  "Transporter/\nCamper": Camper,
  "Kleinbus/Van": Kleinbus,
  Expeditionsmobil: Expeditionsmobil,
  Wohnmobil: Wohnmobil,
  Kofferanhänger: Kofferanhaenger,
  "Wohnanhänger/\nCaravan": Wohnanhaenger,
  "Tiny House": TinyHouse,
  Container: Container,
  Wohnraum: Wohnraum,
};

const EinbauortSection = () => {
  const t = useTranslations("home.installation.locations");
  const locale = useLocale();

  return (
    <section className="flex w-full flex-col gap-y-10 bg-grey-90 from-grey-90 from-90% to-white to-90% px-5 py-10 max-sm:mt-5 sm:bg-gradient-to-br sm:px-10 sm:py-20 lg:px-12 xl:h-full 2xl:px-24 xlarge:px-40">
      <div className="flex flex-col gap-y-10">
        <h2 className="font-title text-4xl text-white sm:text-6xl">
          {t("title")}
        </h2>
        {/* <p className="mt-4 max-w-2xl text-lg text-white sm:text-xl">
          Wähle dein Fahrzeug oder Einbauort aus der Liste aus und entdecke, wie
          sich das Hubbett nahtlos integrieren lässt.
        </p> */}
      </div>

      <div className="z-10 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap">
        {Object.entries(cardData).map(([ort, file], index) => {
          const slug = ort.toLowerCase().replace(/[\s/]+/g, "-");
          const name = locale === "de" ? ort : t(`options.${slug}`);
          return (
            <div
              key={index}
              className="w-full flex-shrink-0 overflow-hidden rounded-lg bg-white pb-5 sm:w-64"
            >
              <Image
                src={file}
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
