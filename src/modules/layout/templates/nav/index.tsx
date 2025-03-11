import { Suspense } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import Logo from "/public/van7-logo.svg";
import NavLink from "./NavLink";
import LanguageSelect from "@modules/layout/components/language-select";
import { StoreRegion } from "@medusajs/types";
import { listRegions } from "@lib/data/regions";
import { getTranslations } from "next-intl/server";

export default async function Nav() {
  const t = await getTranslations("nav");
  const regions = await listRegions().then((regions: StoreRegion[]) => regions);

  return (
    <div className="group sticky inset-x-0 top-0 z-50">
      <header className="relative h-fit bg-white/80 backdrop-blur-sm duration-200">
        <nav className="text-small-regular flex h-full w-full items-center justify-between px-5 text-xl font-semibold uppercase text-ui-fg-subtle sm:px-10 sm:py-3 lg:px-20 xl:px-36">
          <LocalizedClientLink href="/" data-testid="nav-store-link">
            <Logo className="w-[120px] sm:w-[180px]" />
          </LocalizedClientLink>

          <div className="flex h-full items-center justify-end">
            <NavLink href="/">Home</NavLink>
            <NavLink href="hubbett-kaufen">{t("products")}</NavLink>
            <NavLink href="/#bewertungen">{t("reviews")}</NavLink>
            <NavLink href="/#kontakt">{t("contact")}</NavLink>

            <LanguageSelect />

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex gap-2 hover:text-ui-fg-base"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Warenkorb (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            <div className="flex h-full flex-1 basis-0 items-center lg:hidden">
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
