import Check from "/public/check.svg";

const VorteileListe = () => (
  <div className="flex flex-col sm:text-xl">
    <div className="flex items-center gap-x-1 sm:gap-x-2.5">
      <Check />
      Aufbauen und verstauen innerhalb von Sekunden
    </div>
    <div className="flex items-center gap-x-1 sm:gap-x-2.5">
      <Check />
      Stabil fixierbar, kein Schwingen oder Schwanken
    </div>
    <div className="flex items-center gap-x-1 sm:gap-x-2.5">
      <Check />
      Ausreichend Raum für Ausrüstung, Bikes, Möbel
    </div>
    <div className="flex items-center gap-x-1 sm:gap-x-2.5">
      <Check />
      Keine störende Führungsschienen
    </div>
  </div>
);

export default VorteileListe;
