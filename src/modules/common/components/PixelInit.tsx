"use client";
import { useEffect } from "react";

export default function PixelInit() {
  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV === "development")
      return;

    const script = document.createElement("script");
    script.id = "meta-pixel-script";
    script.async = true;
    script.text = `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', ${process.env.NEXT_PUBLIC_PIXEL_ID});
    fbq('track', 'PageView');`;
    document.head.appendChild(script);
    console.log("Pixel init");

    return () => {
      const addedScript = document.getElementById("meta-pixel-script");
      if (addedScript) addedScript.remove();
    };
  }, []);

  return null;
}
