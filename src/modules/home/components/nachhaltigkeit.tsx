import { useTranslations } from "next-intl";
import Image from "next/image";
import Auszeichnung from "/public/overland-expo-gearjunkie-van7.png";
import GreenWorldmap from "/public/green-worldmap.png";

const NachhaltigkeitSection = () => {
  const t = useTranslations("home.sustainability");

  return (
    <section
      id="nachhaltigkeit"
      className="relative flex place-content-center items-center gap-x-10 px-5 py-20 max-lg:flex-col-reverse sm:px-10 lg:px-12 2xl:px-24 xlarge:px-40"
    >
      <Image
        src={GreenWorldmap}
        alt="green world map out of trees"
        className="absolute left-0"
      />
      <Image
        src={Auszeichnung}
        alt="Overland Expo GearJunkie Award"
        className="z-10 max-w-md"
      />
      <div className="flex flex-col gap-y-10 py-5">
        <h2 className="font-title text-4xl text-grey-90 sm:text-6xl">
          {t.rich("title", {
            br: () => <br />,
            span: (text) => <span className="text-brand-content">{text}</span>,
          })}
        </h2>
        <p className="max-w-xl text-lg sm:text-xl">
          {t.rich("text", {
            br: () => <br />,
            b: (text) => <b>{text}</b>,
          })}
        </p>
      </div>
    </section>
  );
};

export default NachhaltigkeitSection;
