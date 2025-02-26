"use client";

import Hintergrund from "/public/optimiert.png";
import HintergrundMobile from "/public/optimiert-mobile.png";

const SeriesCircle = ({
  number,
  isActive,
}: {
  number: number;
  isActive: boolean;
}) => (
  <div
    className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-white bg-grey-90/80 sm:h-20 sm:w-20 ${
      isActive ? "" : "opacity-50"
    }`}
    style={{ boxShadow: "inset 0 0 0 4px #ED1C24" }}
  >
    <span className="text-2xl font-bold text-white sm:text-4xl">{number}</span>
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
  return (
    <section className="relative w-full overflow-hidden bg-grey-90 sm:h-[700px]">
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
      <div className="absolute inset-0 bg-grey-90 opacity-50"></div>
      <div className="relative z-10 flex h-full w-full flex-col content-center items-end justify-between gap-y-5 px-5 py-12 sm:items-center sm:px-10 sm:py-24 lg:px-20 xl:flex-row xl:px-36 2xl:px-48">
        <div className="flex flex-col gap-y-5 sm:gap-y-16">
          <h2 className="font-title text-4xl uppercase text-white sm:text-7xl">
            Getestet und optimiert
          </h2>
          <p className="max-w-2xl text-lg text-white sm:text-2xl">
            Das Van7 Hubbett ist das Ergebnis jahrelanger Entwicklung und
            Optimierung. Durch sorgfältige Tests und kontinuierliche
            Verbesserungen über verschiedene Serien hinweg wurden zahlreiche
            Herausforderungen gelöst, wie etwa die Haltbarkeit der Zahnräder,
            die Effizienz der Seilwinden und die Vermeidung von Verschleiß.
          </p>
        </div>
        <Timeline />
      </div>
    </section>
  );
};

export default OptimiertSection;
