"use client";
import { Checkbox, Textarea } from "@medusajs/ui";
import Input from "@modules/common/components/input";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";

export default function KontaktFormular() {
  const t = useTranslations("form");

  return (
    <>
      <form
        action="https://formspree.io/f/xqaeobav"
        method="POST"
        className="flex max-w-lg flex-col gap-y-5"
      >
        <Input label={t("name")} name="Name" required autoComplete="name" />

        <Input
          label={t("phone")}
          name="Telefonnummer"
          type="tel"
          required
          autoComplete="tel"
        />

        <Input
          label={t("email")}
          name="E-Mail"
          type="email"
          required
          autoComplete="email"
        />

        <Input label={t("message")} name="Nachricht" required multiline />

        <label className="flex w-full flex-wrap items-center gap-x-2 text-lg">
          <Checkbox required />
          <span>
            {t("agreement.prefix")}{" "}
            <LocalizedClientLink href="/datenschutz">
              {t("agreement.privacyPolicy")}
            </LocalizedClientLink>
            ,{" "}
            <LocalizedClientLink href="/agb">
              {t("agreement.terms")}
            </LocalizedClientLink>{" "}
            {t("agreement.and")}{" "}
            <LocalizedClientLink href="/widerrufbelehrung">
              {t("agreement.cancellationPolicy")}
            </LocalizedClientLink>{" "}
            {t("agreement.suffix")}
          </span>
        </label>

        <ReCAPTCHA
          sitekey="6LfcfP8qAAAAACPYI5xVPvAJ2rBRjZMIFFcWy1fG"
          className="g-recaptcha"
        />

        <button
          type="submit"
          className="mt-5 h-fit w-fit rounded bg-gradient-to-b from-brand-light to-brand-dark px-4 py-3 font-bold uppercase leading-none text-white transition-shadow hover:shadow-lg hover:shadow-brand-highlight/30 sm:text-lg"
        >
          {t("submit")}
        </button>
      </form>
    </>
  );
}
