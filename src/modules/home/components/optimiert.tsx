import Hintergrund from "/public/optimiert.png";

const SeriesCircle = ({ number, isActive } : { number: number, isActive: boolean}) => (
  <div
    className={`w-[80px] h-[80px] rounded-full border border-white bg-grey-90/80 flex items-center justify-center relative ${isActive ? "" : "opacity-50"}`}
    style={{ boxShadow: "inset 0 0 0 4px #ED1C24" }}
  >
    <span className="text-[40px] text-white font-barlow font-bold">{number}</span>
  </div>
);

const Timeline = () => (
  <div className="flex items-center gap-x-2.5 pt-24">
    <SeriesCircle number={1} isActive={false} />
    <div className="w-[50px] border-t-4 border-dashed border-white/50" />
    <SeriesCircle number={2} isActive={false} />
    <div className="w-[50px] border-t-4 border-dashed border-white/50" />
    <SeriesCircle number={3} isActive={false} />
    <div className="w-[50px] border-t-4 border-dashed border-white/50" />
    <SeriesCircle number={4} isActive={true} />
    <p className="font-title text-4xl uppercase text-white ml-5">Aktuelle Serie</p>
  </div>
);

const OptimiertSection = () => (
  <section className="h-[700px] w-full relative">
    <div className="w-full px-48 py-24 absolute flex justify-between items-center content-center h-full">
      <div className="gap-y-16 flex flex-col">
        <h2 className="text-7xl uppercase font-title text-white">
          Getestet und optimiert
        </h2>
        <p className="text-2xl text-white max-w-2xl">
          Das Van7 Hubbett ist das Ergebnis jahrelanger Entwicklung und Optimierung. Durch sorgfältige Tests und kontinuierliche Verbesserungen über verschiedene Serien hinweg wurden zahlreiche Herausforderungen gelöst, wie etwa die Haltbarkeit der Zahnräder, die Effizienz der Seilwinden und die Vermeidung von Verschleiß. Was für dich Zeit, Geld und viele Fehler kosten würde, haben wir bereits durch intensive Entwicklungsarbeit getestet und optimiert.
        </p>
      </div>
      <Timeline />
    </div>
    <img src={Hintergrund.src} className="h-full w-full" />
  </section>
);

export default OptimiertSection;