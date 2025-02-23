// app/components/PixelInit.jsx
"use client";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

export default function PixelInit() {
  useEffect(() => {
    ReactPixel.init(process.env.PIXEL_ID ?? "");
    ReactPixel.pageView();
  }, []);

  return null;
}
