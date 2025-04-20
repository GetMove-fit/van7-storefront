"use client";

import Hintergrund from "/public/optimiert.png";
import HintergrundMobile from "/public/optimiert-mobile.png";
import { useTranslations } from "next-intl";

const SeriesCircle = ({
  number,
  isActive,
}: {
  number: number;
  isActive: boolean;
}) => (
  <div
    className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-white bg-grey-90/80 lg:h-20 lg:w-20 ${
      isActive ? "" : "opacity-50"
    }`}
    style={{ boxShadow: "inset 0 0 0 4px #ED1C24" }}
  >
    <span className="text-2xl font-bold text-white lg:text-4xl">{number}</span>
  </div>
);

const Timeline = () => (
  <div className="flex gap-8 sm:items-center lg:pt-24">
    <div className="flex items-center gap-2.5">
      <SeriesCircle number={1} isActive={false} />
      <div className="w-[50px] border-t-4 border-dashed border-white/50" />
      <SeriesCircle number={2} isActive={false} />
      <div className="w-[50px] border-t-4 border-dashed border-white/50" />
      <SeriesCircle number={3} isActive={false} />
      <div className="w-[50px] border-t-4 border-dashed border-white/50" />
      <SeriesCircle number={4} isActive={true} />
    </div>
    <p className="font-title text-2xl uppercase text-white max-sm:mt-2 sm:text-4xl">
      Aktuelle Serie
    </p>
  </div>
);

const OptimiertSection = () => {
  const t = useTranslations("home.optimized");
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-grey-10 sm:h-[700px]">
      {/* Desktop background */}
      <img
        src={Hintergrund.src}
        className="absolute hidden h-full w-full object-cover sm:block"
        alt="Optimiert"
      />
      {/* Mobile background */}
      <img
        src={HintergrundMobile.src}
        className="absolute block h-full w-full object-cover sm:hidden"
        alt="Optimiert mobil"
      />
      <div className="relative z-10 flex h-full w-full flex-col place-content-center gap-y-5 px-5 py-12 max-sm:items-end sm:gap-y-10 sm:px-10 sm:py-24 lg:justify-between xl:flex-row xl:items-center 2xl:px-24 xlarge:px-40">
        <div className="flex flex-col gap-y-5 sm:gap-y-16">
          <h2 className="font-title text-4xl uppercase text-white sm:text-6xl">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-lg text-white sm:text-xl">{t("text")}</p>
        </div>
        <Timeline />
      </div>
    </section>
  );
};

export default OptimiertSection;
