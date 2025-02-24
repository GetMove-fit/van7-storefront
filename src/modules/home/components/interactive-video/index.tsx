"use client";
import React from "react";
import FunktionButton from "/public/funktion.svg";
import Pfeil from "/public/pfeil.png";

export default function InteractiveVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const segments = [
    { time: 4, name: "Ausnivellieren", position: { x: 0.28, y: -0.65 } },
    { time: 8, name: "Fixieren", position: { x: 0.75, y: 0.1 } },
    { time: 15, name: "Ausziehen", position: { x: -0.2, y: -0.1 } },
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
    <div className="relative lg:absolute lg:-right-20 lg:w-[60vw] lg:max-2xl:-bottom-80 xl:-right-10 2xl:top-10">
      {currentSegment === 0 && showButton && (
        <div className="absolute top-5 z-10 flex items-center font-semibold italic max-sm:left-0 sm:right-[45%] sm:text-2xl 2xl:top-20">
          Einfach ausprobieren!
          <img
            src={Pfeil.src}
            width={Pfeil.width}
            height={Pfeil.height}
            className="max-sm:w-14"
          />
        </div>
      )}

      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        muted
        width="1280"
        height="1280"
      >
        <source src="/videos/hubbett-interaktiv.webm" type="video/webm" />
      </video>
      {showButton && currentSegment < segments.length && (
        <button
          onClick={() => {
            setShowButton(false);
            setCurrentSegment(currentSegment + 1);
            if (videoRef.current) videoRef.current.play();
          }}
          style={{
            position: "absolute",
            left: `calc(50% + ${segments[currentSegment].position.x * 50}%)`,
            top: `calc(50% + ${segments[currentSegment].position.y * 50}%)`,
            transform: "translate(-50%, -50%)",
          }}
          className="flex flex-col items-center justify-center text-lg font-medium text-white sm:text-xl"
        >
          <FunktionButton className="max-sm:scale-75" />
          <p className="absolute left-20">{segments[currentSegment].name}</p>
        </button>
      )}
    </div>
  );
}
