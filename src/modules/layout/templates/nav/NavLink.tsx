"use client";
import { usePathname } from "next/navigation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <LocalizedClientLink
      className={`max-sm:hidden hover:text-ui-fg-base flex gap-2 px-8 py-5 ${
        isActive ? "text-brand-content" : ""
      }`}
      href={href}
    >
      {children}
    </LocalizedClientLink>
  );
};

export default NavLink;
