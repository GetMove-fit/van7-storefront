import Image from "next/image";
import KontaktFormular from "./form";
import StefanBild from "/public/dein-berater-stefan.jpg";
import { useTranslations } from "next-intl";

export default function Kontakt() {
  const t = useTranslations("home.contact");
  return (
    <section
      id="kontakt"
      className="relative flex place-content-center place-items-center gap-x-8 px-5 max-lg:flex-col-reverse sm:px-10 lg:px-20 xl:px-36 2xl:px-48"
    >
      <div className="flex flex-col gap-y-10 py-5">
        <h2 className="font-title text-4xl text-grey-90 sm:text-6xl">
          <span className="text-brand-content">{t("stillQuestions")}</span>
          <br />
          {t("StefanWillHelp")}
        </h2>
        <KontaktFormular />
      </div>
      <Image
        src={StefanBild}
        alt="Stefan zeigt auf Hubbett"
        className="object-cover object-top max-lg:h-96 sm:object-center"
      />
    </section>
  );
}
