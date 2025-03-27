"use client";
import { useParams, usePathname } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { clx } from "@medusajs/ui";

const NavLink = ({
  href,
  children,
  invert = false,
}: {
  href: string;
  children: React.ReactNode;
  invert?: boolean;
}) => {
  const pathname = usePathname();
  const { countryCode, locale } = useParams();
  const isActive =
    pathname === `/${countryCode}/${locale}/${href}`.replace(/\/+$/, "");

  return (
    <LocalizedClientLink
      className={clx(
        "flex gap-2 px-8 py-2 hover:text-ui-fg-base max-lg:hidden sm:py-5",
        {
          "text-brand-content": isActive,
          "text-white hover:text-grey-10": invert,
        }
      )}
      href={href}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default NavLink;
