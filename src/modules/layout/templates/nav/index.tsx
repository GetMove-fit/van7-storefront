import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Logo from "/public/van7-logo.svg"
import NavLink from "./NavLink"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-fit duration-200 backdrop-blur-sm bg-white/80">
        <nav className="text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular px-5 sm:px-36 py-3 uppercase text-xl font-semibold">          
          <LocalizedClientLink
            href="/"
            data-testid="nav-store-link"
          >
            <Logo className="w-[138px] sm:w-[180px]" />
          </LocalizedClientLink>

          <div className="flex items-center gap-x-6 h-full justify-end">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/hubbett-kaufen">Produkte</NavLink>
            <NavLink href="/#bewertungen">Bewertungen</NavLink>
            <NavLink href="/#kontakt">Kontakt</NavLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Warenkorb (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
            
            <div className="flex-1 basis-0 h-full flex items-center sm:hidden">
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
