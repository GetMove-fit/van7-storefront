import Check from "/public/check.svg";
import { useTranslations } from "next-intl";

const VorteileListe = () => {
  const t = useTranslations("home.hero.benefits");
  const keys = ["fast", "noMovement", "enoughSpace", "noTracks"];

  return (
    <ul className="flex flex-col sm:text-xl 3xl:gap-y-2 3xl:text-3xl">
      {keys.map((key) => (
        <li className="flex items-center gap-x-1 sm:gap-x-2.5">
          <Check />
          {t(key)}
        </li>
      ))}
    </ul>
  );
};

export default VorteileListe;
