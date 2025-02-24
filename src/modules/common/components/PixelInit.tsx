"use client";
import { useEffect } from "react";

export default function PixelInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    import("react-facebook-pixel").then((ReactPixel) => {
      ReactPixel.init(process.env.PIXEL_ID ?? "");
      ReactPixel.pageView();
      console.log("Pixel initialized");
    });

    return () => {
      // Cleanup: Remove the Facebook Pixel script
      const fbScript = document.querySelector('script[src*="fbevents.js"]');
      if (fbScript) {
        fbScript.remove();
        console.log("Pixel removed");
      }
    };
  }, []);

  return null;
}
