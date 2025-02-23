"use client";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

export default function PixelInit() {
  useEffect(() => {
    ReactPixel.init(process.env.PIXEL_ID ?? "");
    ReactPixel.pageView();
    console.log("Pixel initialized");

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
