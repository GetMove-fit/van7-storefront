import { Suspense } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";
import LanguageSelect from "@modules/layout/components/language-select";
import { StoreRegion } from "@medusajs/types";
import NavBar from "./NavBar";
import { SideMenuProvider } from "@modules/layout/context/SideMenuContext";

export default async function Nav({ regions }: { regions: StoreRegion[] }) {
  return (
    <SideMenuProvider>
      <NavBar>
        <div className="flex items-center">
          <LanguageSelect />

          <Suspense
            fallback={
              <LocalizedClientLink
                className="flex gap-2 hover:text-ui-fg-base"
                href="cart"
                data-testid="nav-cart-link"
              >
                Warenkorb (0)
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>

          <div className="flex h-full flex-1 basis-0 items-center md:hidden">
            <SideMenu regions={regions} />
          </div>
        </div>
      </NavBar>
    </SideMenuProvider>
  );
}
