"use client";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { XMark } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
import { Fragment, useEffect } from "react";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CountrySelect from "../country-select";
import { HttpTypes } from "@medusajs/types";
import MenuIcon from "/public/icons/menu.svg";
import LanguageSelect from "../language-select";
import { useSideMenu } from "../../context/SideMenuContext";

const SideMenuItems = {
  Home: "/",
  Produkte: "/hubbett-kaufen",
  Bewertungen: "/#bewertungen",
  Warenkorb: "/cart",
};

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const { setIsOpen } = useSideMenu();

  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <Popover className="flex h-full">
          {({ open, close }) => {
            useEffect(() => {
              setIsOpen(open);
              return () => {
                setIsOpen(false);
              };
            }, [open]);

            return (
              <>
                <div className="relative flex h-full">
                  <PopoverButton
                    data-testid="nav-menu-button"
                    className="relative flex h-full items-center transition-all duration-200 ease-out hover:text-ui-fg-base focus:outline-none"
                  >
                    <MenuIcon />
                  </PopoverButton>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0"
                  enterTo="opacity-100 backdrop-blur-2xl"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 backdrop-blur-2xl"
                  leaveTo="opacity-0"
                >
                  <PopoverPanel className="absolute right-0 z-30 m-2 flex h-[calc(100vh-1rem)] w-full flex-col text-sm text-ui-fg-on-color backdrop-blur-2xl sm:w-1/3 sm:min-w-min 2xl:w-1/4">
                    <div
                      data-testid="nav-menu-popup"
                      className="flex h-full flex-col justify-between rounded-rounded bg-[rgba(3,7,18,0.5)] p-6"
                    >
                      <div className="flex justify-end" id="xmark">
                        <button data-testid="close-menu-button" onClick={close}>
                          <XMark />
                        </button>
                      </div>
                      <ul className="flex flex-col items-start justify-start gap-6">
                        {Object.entries(SideMenuItems).map(([name, href]) => {
                          return (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                className="text-3xl leading-10 hover:text-ui-fg-disabled"
                                onClick={close}
                                data-testid={`${name.toLowerCase()}-link`}
                              >
                                {name}
                              </LocalizedClientLink>
                            </li>
                          );
                        })}
                      </ul>
                      <LanguageSelect />
                      <div className="flex flex-col gap-y-6">
                        {regions && (
                          <CountrySelect regions={regions} up={true} />
                        )}
                        <Text className="txt-compact-small flex justify-between">
                          Designed & crafted by Ryze Media GmbH © VAN7{" "}
                          {new Date().getFullYear()} All rights reserved.
                        </Text>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </>
            );
          }}
        </Popover>
      </div>
    </div>
  );
};

export default SideMenu;
