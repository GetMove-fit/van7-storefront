"use client";
import React from "react";
import FunktionButton from "/public/funktion.svg";

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
    <div className="absolute sm:-right-20 max-sm:-bottom-20 max-sm:-left-10 max-sm:-right-10 sm:top-0">
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        muted
        width="1280"
        height="1280"
      >
        <source src="/hubbett-interaktiv.webm" type="video/webm" />
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
          className="flex flex-col items-center justify-center text-white text-2xl max-sm:text-lg"
        >
          <FunktionButton className="max-sm:scale-75" />
          <p className="absolute left-20">{segments[currentSegment].name}</p>
        </button>
      )}
    </div>
  );
}
