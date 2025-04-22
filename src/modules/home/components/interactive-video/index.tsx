"use client";
import React from "react";
import FunktionButton from "/public/funktion.svg";
import Pfeil from "/public/pfeil.png";
import { useTranslations } from "next-intl";

export default function InteractiveVideo() {
  const t = useTranslations("home.hero.interactions");
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const segments = [
    {
      time: 4,
      name: t("levelOut"),
      position: { x: 0.28, y: -0.65 },
    },
    {
      time: 8,
      name: t("fix"),
      position: { x: 0.75, y: 0.1 },
    },
    {
      time: 15,
      name: t("extend"),
      position: { x: -0.2, y: -0.1 },
    },
  ];
  const [currentSegment, setCurrentSegment] = React.useState(0);
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.play();
  }, []);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || currentSegment >= segments.length) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= segments[currentSegment].time) {
        video.pause();
        setShowButton(true);
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [currentSegment]);

  return (
    <div className="relative z-20 flex place-self-start sm:max-lg:-mt-10 md:place-self-end lg:-mb-10 2xl:-mb-40">
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        muted
        width="1280"
        height="1280"
      >
        <source src="/videos/hubbett-interaktiv.webm" type="video/webm" />
        <source src="/videos/hubbett-interaktiv.mp4" type="video/mp4" />
      </video>
      {showButton && currentSegment < segments.length && (
        <div
          className="absolute flex"
          style={{
            left: `calc(50% + ${segments[currentSegment].position.x * 50}%)`,
            top: `calc(50% + ${segments[currentSegment].position.y * 50}%)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {currentSegment === 0 && (
            <div className="absolute z-10 flex -translate-x-1/2 -translate-y-full items-center whitespace-nowrap font-semibold italic sm:-translate-x-full sm:text-2xl">
              <div className="relative flex">
                <div className="absolute h-full w-full -skew-x-12 bg-white/90"></div>
                <div className="z-20 px-2 py-1">{t("tryNow")}</div>
              </div>
              <img
                src={Pfeil.src}
                width={Pfeil.width}
                height={Pfeil.height}
                className="w-32 max-sm:w-20 max-sm:invert"
              />
            </div>
          )}
          <button
            onClick={() => {
              setShowButton(false);
              setCurrentSegment(currentSegment + 1);
              if (videoRef.current) videoRef.current.play();
            }}
            className="flex flex-col items-center justify-center text-lg font-semibold italic text-white sm:text-xl"
          >
            <FunktionButton className="max-sm:scale-75" />
            <p className="absolute left-20">{segments[currentSegment].name}</p>
          </button>
        </div>
      )}
    </div>
  );
}
