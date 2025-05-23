import { useTranslations } from "next-intl";
import Image from "next/image";

import Einbaupartner from "/public/einbaupartner.png";
import Anleitung from "/public/anleitung.png";

const Installation = () => {
  const t = useTranslations("home.installation");
  return (
    <section className="flex gap-8 bg-white px-5 py-16 max-md:flex-col sm:px-10 lg:px-12 2xl:px-24 xlarge:px-40">
      <a
        href="https://storelocator.page/1655a5a5fd1957"
        className="group relative flex w-full flex-col overflow-hidden transition-shadow hover:shadow-lg"
      >
        <Image
          src={Einbaupartner}
          alt="Karte mit Einbaupartner in der EU"
          className="absolute h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-grey-90/40 to-grey-90" />
        <div className="z-10 flex h-full flex-col items-center justify-end p-2 py-4 text-lg text-white sm:p-12 sm:text-2xl lg:pt-40">
          Installation
          <h2 className="text-center font-title text-3xl tracking-wider sm:text-5xl">
            {t("partner.title")}
          </h2>
          <p className="mt-5 text-center sm:mt-8">{t("partner.text")}</p>
          <p className="mt-4 font-bold uppercase group-hover:text-brand-light sm:mt-8">
            {t("button")}
          </p>
        </div>
      </a>

      <a
        href="https://www.youtube.com/watch?v=lIlyJ72-LAk"
        className="group relative flex w-full flex-col overflow-hidden transition-shadow hover:shadow-lg"
      >
        <Image
          src={Anleitung}
          alt="Karte mit Anleitung in der EU"
          className="absolute h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-grey-90" />
        <div className="z-10 flex h-full flex-col items-center justify-end p-2 py-4 text-lg text-white sm:p-12 sm:text-2xl lg:pt-40">
          Installation
          <h2 className="text-center font-title text-3xl tracking-wider sm:text-5xl">
            {t("diy.title")}
          </h2>
          <p className="mt-5 text-center sm:mt-8">{t("diy.text")}</p>
          <p className="mt-4 font-bold uppercase group-hover:text-brand-light sm:mt-8">
            {t("button")}
          </p>
        </div>
      </a>
    </section>
  );
};

export default Installation;
