"use client"

import Hintergrund from "/public/optimiert.png";
import HintergrundMobile from "/public/optimiert-mobile.png";

const SeriesCircle = ({ number, isActive } : { number: number, isActive: boolean}) => (
  <div
    className={`w-12 h-12 sm:w-20 sm:h-20 rounded-full border border-white bg-grey-90/80 flex items-center justify-center relative ${isActive ? "" : "opacity-50"}`}
    style={{ boxShadow: "inset 0 0 0 4px #ED1C24" }}
  >
    <span className="text-2xl sm:text-4xl text-white font-barlow font-bold">{number}</span>
  </div>
);

const Timeline = () => (
  <div className="flex gap-8 sm:items-center sm:pt-24">
    <div className="flex max-sm:flex-col-reverse items-center gap-2.5">
      <SeriesCircle number={1} isActive={false} />
      {/* Desktop dashed connector */}
      <div className="hidden sm:block w-[50px] border-t-4 border-dashed border-white/50" />
      {/* Mobile dashed connector */}
      <div className="block sm:hidden h-[50px] border-l-4 border-dashed border-white/50" />
      <SeriesCircle number={2} isActive={false} />
      <div className="hidden sm:block w-[50px] border-t-4 border-dashed border-white/50" />
      <div className="block sm:hidden h-[50px] border-l-4 border-dashed border-white/50" />
      <SeriesCircle number={3} isActive={false} />
      <div className="hidden sm:block w-[50px] border-t-4 border-dashed border-white/50" />
      <div className="block sm:hidden h-[50px] border-l-4 border-dashed border-white/50" />
      <SeriesCircle number={4} isActive={true} />
    </div>
    <p className="font-title text-2xl max-sm:mt-2 sm:text-4xl uppercase text-white">Aktuelle Serie</p>
  </div>
);

const OptimiertSection = () => {
  return (
    <section className="sm:h-[700px] w-full relative max-sm:h-screen bg-grey-90">
      {/* Desktop background */}
      <img
        src={Hintergrund.src}
        className="hidden sm:block absolute w-full h-full object-cover"
        alt="Optimiert"
      />
      {/* Mobile background */}
      <img
        src={HintergrundMobile.src}
        className="block sm:hidden absolute w-full h-full object-cover"
        alt="Optimiert mobil"
      />
      <div className="absolute inset-0 bg-grey-90 opacity-50"></div>
      <div className="relative z-10 w-full h-full px-5 sm:px-48 py-12 sm:py-24 flex flex-col sm:flex-row justify-between sm:items-center content-center">
        <div className="gap-y-10 sm:gap-y-16 flex flex-col">
          <h2 className="text-5xl sm:text-7xl uppercase font-title text-white">
            Getestet und optimiert
          </h2>
          <p className="text-lg sm:text-2xl text-white max-w-2xl">
            Das Van7 Hubbett ist das Ergebnis jahrelanger Entwicklung und Optimierung. Durch sorgfältige Tests und kontinuierliche Verbesserungen über verschiedene Serien hinweg wurden zahlreiche Herausforderungen gelöst, wie etwa die Haltbarkeit der Zahnräder, die Effizienz der Seilwinden und die Vermeidung von Verschleiß. Was für dich Zeit, Geld und viele Fehler kosten würde, haben wir bereits durch intensive Entwicklungsarbeit getestet und optimiert.
          </p>
        </div>
        <Timeline />
      </div>
    </section>
  );
};

export default OptimiertSection;