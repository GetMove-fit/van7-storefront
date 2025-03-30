"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Banner({
  src,
  children,
}: {
  src: string;
  children: React.ReactNode;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgRef.current && containerRef.current && window.innerWidth > 640) {
      gsap.to(imgRef.current, {
        y: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top-=50% top",
          end: "bottom-=50% top",
          scrub: true,
          markers: true,
        },
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[33vh] items-center overflow-hidden rounded-lg"
    >
      <img
        ref={imgRef}
        src={src}
        className="w-full object-cover max-sm:h-full"
      />
      <div className="absolute bottom-0 p-5 font-title text-5xl uppercase leading-none text-white sm:inset-0 sm:text-8xl">
        {children}
      </div>
    </div>
  );
}
