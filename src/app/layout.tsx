import { getBaseURL } from "@lib/util/env";
import RunCookieConsent from "@modules/common/components/RunCookieConsent";
import WhatsappBubble from "@modules/common/components/WhatsappBubble";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  console.log(locale);

  return (
    <html lang={locale} data-mode="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <RunCookieConsent />
        <NextIntlClientProvider messages={messages}>
          <main className="relative">{props.children}</main>
        </NextIntlClientProvider>

        <WhatsappBubble />
      </body>
    </html>
  );
}
