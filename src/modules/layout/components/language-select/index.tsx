"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { ArrowRightMini } from "@medusajs/icons";
import { clx, useToggleState } from "@medusajs/ui";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { locales } from "@lib/constants";

// Default mapping of locales to country flags
const DEFAULT_FLAGS: Record<string, string> = {
  en: "gb", // English -> Great Britain flag
  de: "de", // German -> Germany flag
  fr: "fr", // French -> France flag
  es: "es", // Spanish -> Spain flag
  it: "it", // Italian -> Italy flag
  pt: "pt", // Portuguese -> Portugal flag
  // Add more as needed
};

// Default mapping of locales to display names
const DEFAULT_LABELS: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  // Add more as needed
};

type LanguageOption = {
  locale: string;
  label: string;
  flag?: string;
};

type LanguageSelectProps = {
  // Only require the list of available locales, everything else is optional
  locales?: string[];
  labels?: Record<string, string>;
  flags?: Record<string, string>;
  up?: boolean;
};

const LanguageSelect = ({
  labels = DEFAULT_LABELS,
  flags = DEFAULT_FLAGS,
  up = false,
}: LanguageSelectProps) => {
  const currentLocale = useLocale();
  const { state, open, close } = useToggleState(false);
  const pathname = usePathname();

  const options = useMemo(() => {
    return locales
      .map((locale) => ({
        locale,
        label: labels[locale] || locale.toUpperCase(),
        flag: flags[locale],
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [locales, labels, flags]);

  // Replace useState + useEffect with useMemo to derive current option
  const current = useMemo(() => {
    return options.find((o) => o.locale === currentLocale) || options[0];
  }, [options, currentLocale]);

  const handleChange = (option: LanguageOption) => {
    // document.cookie = `NEXT_LOCALE=${option.locale}; path=/; max-age=${60 * 60 * 24 * 30}`;

    // Split the path into segments
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length >= 2) {
      // If we have at least 2 segments, replace the second one (locale)
      segments[1] = option.locale;
    } else if (segments.length === 1) {
      // If we only have one segment, add the locale as the second segment
      segments.push(option.locale);
    } else {
      // If the path is empty, create a path with the locale as the second segment
      segments.push("", option.locale);
    }

    // Reconstruct the path
    const newPath = `/${segments.join("/")}`;

    // Force a full page reload to ensure headers are updated
    window.location.href = newPath;
    close();
  };

  return (
    <div
      className="flex items-center uppercase"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Listbox as="span" onChange={handleChange} value={current}>
        <ListboxButton className="w-full py-1 hover:text-ui-fg-base">
          <div className="flex items-start gap-x-2">
            {current && (
              <span className="flex items-center gap-x-2 uppercase">
                {current.flag && (
                  <span className="flex items-center">
                    <ReactCountryFlag
                      countryCode={current.flag.toUpperCase()}
                      svg
                      style={{ width: "16px", height: "16px" }}
                    />
                  </span>
                )}
                <p className="max-sm:hidden">{current.label}</p>
              </span>
            )}
          </div>
        </ListboxButton>
        <div className="relative flex w-8 sm:w-32">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={clx(
                "text-small-regular no-scrollbar absolute left-0 z-[900] max-h-[442px] w-32 overflow-y-scroll rounded-rounded bg-white uppercase text-black drop-shadow-md xsmall:left-auto xsmall:right-0",
                {
                  "top-full": !up,
                  "-bottom-[calc(100%-36px)]": up,
                }
              )}
              static
            >
              {options.map((o, index) => {
                return (
                  <ListboxOption
                    key={index}
                    value={o}
                    className="flex cursor-pointer items-center gap-x-2 px-3 py-2 hover:bg-gray-200"
                  >
                    {o.flag && (
                      <ReactCountryFlag
                        countryCode={o.flag.toUpperCase()}
                        svg
                        style={{ width: "16px", height: "16px" }}
                      />
                    )}
                    {o.label}
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>

      <ArrowRightMini
        className={clx("transition-transform duration-150", {
          "-rotate-90": state && up,
          "rotate-90": state,
        })}
      />
    </div>
  );
};

export default LanguageSelect;
