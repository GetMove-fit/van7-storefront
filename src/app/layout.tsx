import { getBaseURL } from "@lib/util/env";
import PixelInit from "@modules/common/components/PixelInit";
import { Metadata } from "next";
import "styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="de" data-mode="light">
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
        <PixelInit />
        <main className="relative">{props.children}</main>
      </body>
    </html>
  );
}
