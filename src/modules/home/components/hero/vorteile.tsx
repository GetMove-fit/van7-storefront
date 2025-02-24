import { clx } from "@medusajs/ui";
import Check from "/public/check.svg";

const VorteileListe = ({ small }: { small: boolean }) => (
  <div
    className={clx("flex flex-col", {
      "sm:text-xl": !small,
    })}
  >
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
      Keine störenden Führungsschienen
    </div>
  </div>
);

export default VorteileListe;
