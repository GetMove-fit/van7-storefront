"use client";

import { useEffect, useState } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Logo from "/public/van7-logo.svg";
import { usePathname } from "next/navigation";
import { clx } from "@medusajs/ui";
import NavLink from "./NavLink";
import { useTranslations } from "next-intl";
import { useSideMenu } from "../../context/SideMenuContext";

export default function NavBar({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");
  const { isOpen: isSideMenuOpen } = useSideMenu();

  const isHomePage = /^\/[a-zA-Z]{2}\/[a-zA-Z]{2}$/.test(usePathname());

  const [hideBg, setIsAtTop] = useState(isHomePage);

  useEffect(() => {
    const handleScroll = () => {
      // Consider "at top" when scrolled less than 10px
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsAtTop(scrollTop < 10);
    };

    // Set initial state
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <div
      className={clx(
        "group inset-x-0 top-0 z-50 transition-colors duration-300",
        {
          "bg-white/80 backdrop-blur-sm": !hideBg && !isSideMenuOpen,
          fixed: isHomePage,
          sticky: !isHomePage,
        }
      )}
    >
      <header className="relative h-fit duration-200">
        <nav className="text-small-regular flex h-full w-full items-center gap-x-10 pl-5 text-xl font-semibold uppercase text-ui-fg-subtle sm:py-3 sm:pl-10 lg:px-12 2xl:px-24 xlarge:px-40">
          <LocalizedClientLink
            href="/"
            data-testid="nav-store-link"
            aria-label="Go to homepage"
          >
            <Logo className="w-[120px] sm:w-[180px]" />
          </LocalizedClientLink>

          <div className="flex w-full items-center justify-between">
            <div className="flex h-full">
              <NavLink href="/">Home</NavLink>
              <NavLink href="hubbett-kaufen">{t("products")}</NavLink>
              <NavLink href="/#bewertungen">{t("reviews")}</NavLink>
              <NavLink href="/#kontakt">{t("contact")}</NavLink>
            </div>

            <div
              className={clx(
                "flex h-full items-center justify-between pr-5 md:pr-10 lg:pr-0"
                // {
                //   "bg-white/90": hideBg && isHomePage,
                // }
              )}
            >
              {children}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
