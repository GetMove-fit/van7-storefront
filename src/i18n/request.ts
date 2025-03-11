import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  // Default fallback locale - changed to English
  let locale = "en";

  // Try to get locale from cookie first
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  if (cookieLocale) {
    // Use cookie locale if available - this is user controlled
    locale = cookieLocale;
  } else {
    // Otherwise try to extract locale from URL path
    const headersList = await headers();
    // These headers are provided by Next.js internally for server components
    const pathname =
      headersList.get("x-url") || headersList.get("x-invoke-path") || "";

    // Check if the URL path contains a locale
    const pathMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
    if (pathMatch && pathMatch[1]) {
      const urlLocale = pathMatch[1];

      // Set locale to German only for German-speaking country codes
      if (["de", "at", "ch", "li"].includes(urlLocale)) {
        locale = "de";
      } else {
        locale = "en";
      }

      // Set cookie for future requests
      cookieStore.set("NEXT_LOCALE", locale);
    }
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
