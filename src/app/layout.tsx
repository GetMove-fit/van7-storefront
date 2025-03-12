import { getBaseURL } from "@lib/util/env";
import RunCookieConsent from "@modules/common/components/RunCookieConsent";
import WhatsappBubble from "@modules/common/components/WhatsappBubble";
import { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export const viewport: Viewport = {
  themeColor: "#ED1C24",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

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
          <main className="relative">{children}</main>
        </NextIntlClientProvider>

        <WhatsappBubble />
      </body>
    </html>
  );
}
