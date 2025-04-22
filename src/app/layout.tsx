import { getBaseURL } from "@lib/util/env";
import RunCookieConsent from "@modules/common/components/RunCookieConsent";
import WhatsappBubble from "@modules/common/components/WhatsappBubble";
import { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Barlow, Bebas_Neue } from "next/font/google";
import "styles/globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap", // minimizes layout
  variable: "--font-barlow",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export const viewport: Viewport = {
  themeColor: "#ED1C24",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} data-mode="light">
      <body>
        <RunCookieConsent />
        <NextIntlClientProvider messages={messages}>
          <main
            className={`${barlow.variable} ${bebasNeue.variable} relative font-sans`}
          >
            {children}
          </main>
        </NextIntlClientProvider>

        <WhatsappBubble />
      </body>
    </html>
  );
}
