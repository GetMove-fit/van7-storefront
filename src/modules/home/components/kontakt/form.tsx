"use client";
import { Checkbox, Textarea } from "@medusajs/ui";
import Input from "@modules/common/components/input";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default function KontaktFormular() {
  return (
    <form
      action="https://formspree.io/f/xqaeobav"
      method="POST"
      className="flex max-w-lg flex-col gap-y-5"
    >
      <Input label="Name" name="full_name" required autoComplete="name" />

      <Input
        label="Telefonnummer"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
      />

      <Input
        label="E-Mail"
        name="email"
        type="email"
        required
        autoComplete="email"
      />

      <Textarea name="message" required className="h-40" />

      <label className="flex w-full flex-wrap items-center gap-x-2 text-lg">
        <Checkbox required />
        <span>
          Ich habe die{" "}
          <LocalizedClientLink href="/datenschutz">
            Datenschutzerklärung
          </LocalizedClientLink>
          , <LocalizedClientLink href="/agb">AGB</LocalizedClientLink> und{" "}
          <LocalizedClientLink href="/widerrufbelehrung">
            Widerrufsbelehrung
          </LocalizedClientLink>{" "}
          gelesen, verstanden und stimme diesen zu.
        </span>
      </label>

      <button
        type="submit"
        className="mt-5 h-fit w-fit rounded bg-gradient-to-b from-brand-light to-brand-dark px-4 py-3 font-bold uppercase leading-none text-white transition-shadow hover:shadow-lg hover:shadow-brand-highlight/30 sm:text-lg"
      >
        Nachricht senden
      </button>
    </form>
  );
}
