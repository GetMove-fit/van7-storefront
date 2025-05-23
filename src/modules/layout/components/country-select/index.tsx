"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { ArrowRightMini } from "@medusajs/icons";
import { clx, useToggleState } from "@medusajs/ui";

import { useParams, usePathname } from "next/navigation";
import { updateRegion } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";

type CountryOption = {
  country: string;
  region: string;
  label: string;
};

type CountrySelectProps = {
  regions: HttpTypes.StoreRegion[];
  up: boolean;
};

const CountrySelect = ({ regions, up }: CountrySelectProps) => {
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined);

  const { countryCode } = useParams();
  const currentPath = usePathname().split(`/${countryCode}`)[1];

  const { state, open, close } = useToggleState(false);

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }));
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""));
  }, [regions]);

  useEffect(() => {
    if (countryCode) {
      setCurrent(options?.find((o) => o?.country === countryCode));
    }
  }, [options, countryCode]);

  const handleChange = (option: CountryOption) => {
    updateRegion(option.country, currentPath);
    close();
  };

  const t = useTranslations();

  return (
    <div
      className="flex w-full justify-between"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Listbox
        as="span"
        onChange={handleChange}
        defaultValue={
          countryCode
            ? options?.find((o) => o?.country === countryCode)
            : undefined
        }
      >
        <ListboxButton className="w-full py-1">
          <div className="txt-compact-small flex items-start gap-x-2">
            <span>{t("shipTo")}:</span>
            {current && (
              <span className="txt-compact-small flex items-center gap-x-2">
                {/* @ts-ignore */}
                <ReactCountryFlag
                  svg
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  countryCode={current.country ?? ""}
                />

                {current.label}
              </span>
            )}
          </div>
        </ListboxButton>
        <div className="relative flex w-full min-w-[320px]">
          <Transition
            show={state}
            as={Fragment}
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={clx(
                "text-small-regular no-scrollbar absolute left-0 z-[900] max-h-[442px] w-full overflow-y-scroll rounded-rounded bg-white uppercase text-black drop-shadow-md xsmall:left-auto xsmall:right-0",
                {
                  up: "-bottom-[calc(100%-36px)]",
                }
              )}
              static
            >
              {options?.map((o, index) => {
                return (
                  <ListboxOption
                    key={index}
                    value={o}
                    className="flex cursor-pointer items-center gap-x-2 px-3 py-2 hover:bg-gray-200"
                  >
                    {/* @ts-ignore */}
                    <ReactCountryFlag
                      svg
                      style={{
                        width: "16px",
                        height: "16px",
                      }}
                      countryCode={o?.country ?? ""}
                    />{" "}
                    {o?.label}
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>

      <ArrowRightMini
        className={clx(
          "transition-transform duration-150",
          state ? "-rotate-90" : ""
        )}
      />
    </div>
  );
};

export default CountrySelect;
