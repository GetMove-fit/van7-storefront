import Image from "next/image";
import KontaktFormular from "./form";
import StefanBild from "/public/dein-berater-stefan.jpg";
import { useTranslations } from "next-intl";

export default function Kontakt() {
  const t = useTranslations("home.contact");
  return (
    <section
      id="kontakt"
      className="relative flex place-content-center items-center gap-x-8 px-5 max-lg:flex-col-reverse sm:px-10 lg:px-12 2xl:px-24 xlarge:px-40"
    >
      <div className="flex flex-col gap-y-10 py-5">
        <h2 className="font-title text-4xl text-grey-90 sm:text-6xl">
          <span className="text-brand-content">{t("stillQuestions")}</span>
          <br />
          {t("StefanWillHelp")}
        </h2>
        <KontaktFormular />
      </div>
      <div className="relative flex">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent from-50% to-grey-10"></div>
        <Image
          src={StefanBild}
          alt="Stefan zeigt auf Hubbett"
          className="object-cover object-top max-lg:h-96 sm:object-center"
        />
      </div>
    </section>
  );
}
