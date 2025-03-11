import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  // Try to get locale from cookie
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
