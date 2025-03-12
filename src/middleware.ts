import { HttpTypes } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us";

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
};

async function getRegionMap(cacheId: string) {
  const { regionMap, regionMapUpdated } = regionMapCache;

  if (!BACKEND_URL) {
    throw new Error(
      "Middleware.ts: Error fetching regions. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
    );
  }

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY!,
      },
      next: {
        revalidate: 3600,
        tags: [`regions-${cacheId}`],
      },
      cache: "force-cache",
    }).then(async (response) => {
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return json;
    });

    if (!regions?.length) {
      throw new Error(
        "No regions found. Please set up regions in your Medusa Admin."
      );
    }

    // Create a map of country codes to regions.
    regions.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2 ?? "", region);
      });
    });

    regionMapCache.regionMapUpdated = Date.now();
  }

  return regionMapCache.regionMap;
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, HttpTypes.StoreRegion | number>
) {
  try {
    let countryCode;

    const vercelCountryCode = request.headers
      .get("x-ip-country")
      ?.toLowerCase();

    const urlCountryCode = request.nextUrl.pathname
      .split("/")[1]
      ?.toLowerCase();

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode;
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode;
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION;
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value;
    }

    return countryCode;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a MEDUSA_BACKEND_URL environment variable? Note that the variable is no longer named NEXT_PUBLIC_MEDUSA_BACKEND_URL."
      );
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  // Constants
  const CACHE_ID_MAX_AGE = 60 * 60 * 24; // 1 day
  const LOCALE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
  const germanSpeakingCountries = ["de", "at", "ch", "li"];

  // Handle static assets - pass through immediately
  if (request.nextUrl.pathname.includes(".")) {
    return NextResponse.next();
  }

  // Initialize cache ID
  const cacheIdCookie = request.cookies.get("_medusa_cache_id");
  const cacheId = cacheIdCookie?.value || crypto.randomUUID();

  // Get region information
  const regionMap = await getRegionMap(cacheId);
  const countryCode = regionMap && (await getCountryCode(request, regionMap));
  if (!countryCode) return NextResponse.next();

  // Path analysis
  const pathParts = request.nextUrl.pathname.split("/").filter(Boolean);

  // Determine locale
  const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");
  const isGermanSpeaking = germanSpeakingCountries.includes(countryCode);
  const locale =
    request.cookies.get("NEXT_LOCALE")?.value ??
    (isGermanSpeaking ? "de" : "en");

  // Create a response - either redirect or pass through
  let response;

  // Check if URL has the correct structure: /{countryCode}/{locale}/...
  const hasCorrectStructure =
    pathParts[0] === countryCode &&
    (pathParts[1] === "en" || pathParts[1] === "de");

  if (hasCorrectStructure) {
    // URL structure is correct, continue without redirect
    response = NextResponse.next();
  } else {
    // URL needs correction - build proper URL with country and locale
    const remainingPath =
      pathParts.length > 0 && pathParts[0] !== countryCode
        ? `/${pathParts.join("/")}`
        : pathParts.length > 1 && pathParts[0] === countryCode
          ? `/${pathParts.slice(1).join("/")}`
          : "";

    const redirectUrl = `${request.nextUrl.origin}/${countryCode}/${locale}${remainingPath}${request.nextUrl.search}`;
    response = NextResponse.redirect(redirectUrl, 307);
  }

  // Set necessary cookies
  if (!cacheIdCookie) {
    response.cookies.set("_medusa_cache_id", cacheId, {
      maxAge: CACHE_ID_MAX_AGE,
    });
  }

  if (!hasLocaleCookie) {
    response.cookies.set("NEXT_LOCALE", locale, { maxAge: LOCALE_MAX_AGE });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
};
