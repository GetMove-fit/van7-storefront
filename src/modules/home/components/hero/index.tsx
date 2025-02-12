"use client"
import Stars from "/public/stars.svg"
import Check from "/public/check.svg"
import React from "react"

const Hero = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const segments = [4, 7, 9, 15]; // timestamps in seconds, adjust as needed
  const [currentSegment, setCurrentSegment] = React.useState(0)
  const [showButton, setShowButton] = React.useState(false)

  // Auto-play video on mount
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  // Update video time and pause video at segment timestamps; update progress during first segment
  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      if (
        currentSegment < segments.length &&
        video.currentTime >= segments[currentSegment]
      ) {
        video.pause()
        setShowButton(true)
      }
    }

    video.addEventListener("timeupdate", onTimeUpdate)
    return () => video.removeEventListener("timeupdate", onTimeUpdate)
  }, [currentSegment, segments])

  return <div className="flex bg-grey-10 pl-36 py-10">
  <div className="flex flex-col gap-y-10">
    <div className="flex flex-col gap-y-6 text-2xl">
      <div className="flex gap-x-4">
        <Stars/>
        500+ zufriedene Kunden
      </div>

      <h1 className="text-8xl leading-none uppercase font-title">
        Das Hubbett<br/>mit dem höchsten<br/>Komfort & Raumnutzung<br/>
      </h1>

      <p>
        Stelle die perfekte Höhe ein und hol das Beste aus deinem Raum heraus.<br/>
        Ausnivellieren und Schlafkomfort genießen wie Zuhause - egal wo du parkst.
      </p>
    </div>

    <div className="flex flex-col text-xl">
      <div className="flex gap-x-2.5">
        <Check/>
        Aufbauen und verstauen innerhalb von Sekunden
      </div>
      <div className="flex gap-x-2.5">
        <Check/>
        Stabil fixierbar, kein Schwingen oder Schwanken
      </div>
      <div className="flex gap-x-2.5">
        <Check/>
        Ausreichend Raum für Ausrüstung, Bikes, oder Möbel
      </div>
      <div className="flex gap-x-2.5">
        <Check/>
        Keine störende Führungsschienen
      </div>
    </div>

    <button className="uppercase bg-gradient-to-b from-brand-light to-brand-dark font-bold text-white py-5 px-6 rounded h-fit text-2xl leading-none hover:shadow-brand-highlight/30 hover:shadow-lg transition-shadow w-fit">
      Neue Serie vorbestellen
    </button>
  </div>

  <video
    ref={videoRef}
    playsInline
    webkit-playsinline="true"
    preload="metadata"
    muted
    width="1000"
    height="1000"
    className="absolute right-0 top-0"
  >
    <source src="/kingsize-hero4.webm" type="video/webm" />
  </video>

  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 space-x-4">
    {segments.map((ts, idx) => (
      <button
        key={idx}
        disabled={!(showButton && currentSegment === idx)}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        onClick={() => {
          setShowButton(false)
          setCurrentSegment(currentSegment + 1)
          if (videoRef.current) videoRef.current.play()
        }}
      >
        Continue {idx + 1}
      </button>
    ))}
  </div>
</div>
}

export default Hero
