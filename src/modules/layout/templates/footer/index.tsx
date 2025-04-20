import Image from "next/image";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { getTranslations } from "next-intl/server";

import FooterMask from "/public/footer-mask.svg";
import FooterHintergrund from "/public/footer.png";
import Logo from "/public/van7-logo.svg";

import InstaIcon from "/public/icons/social/instagram.svg";
import FacebookIcon from "/public/icons/social/facebook.svg";
import YoutubeIcon from "/public/icons/social/youtube.svg";

import StandortIcon from "/public/icons/kontakt/standort.svg";
import TelefonIcon from "/public/icons/kontakt/telefon.svg";
import MailIcon from "/public/icons/kontakt/email.svg";
import WhatsappIcon from "/public/icons/kontakt/whatsapp.svg";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="relative flex w-full flex-col items-center text-white">
      <Image
        src={FooterHintergrund}
        alt="gloomy pine forest"
        sizes="100vw"
        className="absolute h-full w-full object-cover"
      />
      <FooterMask className="absolute w-full fill-grey-10 max-sm:h-10" />

      <div className="z-20 mt-10 flex max-w-sm flex-col items-center justify-center gap-y-4 text-center text-lg max-sm:px-5 sm:mt-20 sm:gap-y-8 lg:absolute 2xl:max-w-md">
        <Logo className="w-[120px] sm:w-[150px]" />
        <p>{t("description")}</p>
      </div>

      <div className="z-10 flex w-full flex-col gap-y-5 px-5 py-20 pt-5 sm:gap-y-10 sm:px-10 md:pt-32 lg:px-20 xl:px-36 2xl:px-80">
        <div className="flex justify-between gap-y-5 text-lg max-sm:flex-col-reverse sm:text-xl">
          <div className="flex flex-col gap-y-2 sm:gap-y-4">
            <p className="text-xl font-medium sm:text-2xl">{t("followUs")}</p>
            <div className="flex gap-x-5">
              <a
                href="https://www.instagram.com/van7.at/"
                className="flex h-12 w-12 place-content-center items-center border border-white transition-transform hover:scale-105"
              >
                <InstaIcon />
              </a>
              <a
                href="https://www.facebook.com/van7.at"
                className="flex h-12 w-12 place-content-center items-center border border-white transition-transform hover:scale-105"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.youtube.com/@Van-si3rr"
                className="flex h-12 w-12 place-content-center items-center border border-white transition-transform hover:scale-105"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 sm:items-end sm:gap-y-4">
            <p className="text-xl font-medium sm:text-2xl">
              {t("contactInfo")}
            </p>
            <div className="flex items-center gap-x-2 sm:flex-row-reverse sm:gap-x-5">
              <StandortIcon />
              {t("address")}
            </div>
            <a
              className="flex items-center gap-x-2 sm:flex-row-reverse sm:gap-x-5"
              href="mailto:info@van7.at"
            >
              <MailIcon />
              {t("email")}
            </a>
            <a
              className="flex items-center gap-x-2 sm:flex-row-reverse sm:gap-x-5"
              href="tel:+436763372556"
            >
              <TelefonIcon />
              {t("phone")}
            </a>
            <a
              className="flex items-center gap-x-2 sm:flex-row-reverse sm:gap-x-5"
              href="https://wa.me/436763372556"
            >
              <WhatsappIcon />
              {t("whatsapp")}
            </a>
          </div>
        </div>

        <hr />

        <div className="flex flex-wrap justify-center gap-x-5 text-lg sm:justify-between">
          <div className="flex gap-x-5 sm:gap-x-20">
            <LocalizedClientLink href="hubbett-kaufen">
              {t("shop")}
            </LocalizedClientLink>
            <LocalizedClientLink href="impressum">
              {t("impressum")}
            </LocalizedClientLink>
          </div>

          <div className="flex gap-x-5 sm:gap-x-20">
            <LocalizedClientLink href="agb">{t("agb")}</LocalizedClientLink>
            <LocalizedClientLink href="datenschutz">
              {t("privacyPolicy")}
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 z-20 flex items-center justify-center gap-x-5 text-lg max-md:flex-col-reverse lg:bottom-20">
        <p>© {new Date().getFullYear()} VAN7</p>
        <p>
          {t("designedBy")}{" "}
          <a className="font-bold" href="https://www.ryze-media.at">
            Ryze Media
          </a>
        </p>
      </div>
    </footer>
  );
}
