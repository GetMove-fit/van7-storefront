"use client"

import React from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

import HeroParallax from "/public/parallax.svg"

gsap.registerPlugin(ScrollTrigger)

export function Parallax() {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  useGSAP(() => {
    if (typeof window === "undefined") return

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#bg_hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        markers: true,
      },
    })

    // Example background animations.
    scrollTimeline
      .to("#mountains", { y: -20 }, 0)
      .to("#forest", { y: -30 }, 0)
      .to("#ground", { y: 300 }, 0)
      .to("#person", { y: 40 }, 0)
    // Updated video animation using videoRef.current
    if (videoRef.current) {
      scrollTimeline.to(videoRef.current, { y: -300 }, 0)
    }
  });
  
  // segments and state variables as before
  const segments = [4, 7, 9, 15] // timestamps in seconds, adjust as needed
  const [currentSegment, setCurrentSegment] = React.useState(0)
  const [showButton, setShowButton] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  // Create a ref for the parallax timeline
  const parallaxTimelineRef = React.useRef<gsap.core.Timeline | null>(null)

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
      if (currentSegment === 0) {
        setProgress(video.currentTime)
      }
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
  
  // Sync the parallax timeline with video progress during the first segment
  React.useEffect(() => {
    if (currentSegment === 0 && parallaxTimelineRef.current) {
      const normalizedProgress = Math.min(progress / segments[0], 1)
      gsap.to(parallaxTimelineRef.current, {
        progress: normalizedProgress,
        duration: 0.5, // increased duration for smoother transition
        // ease: "power2.out",
      })
    }
  }, [progress, currentSegment, segments])

  // Handler for scrubbing the progress bar in the first segment
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setProgress(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // Combined effect: animate h1 lines to fly in and animate letter spacing on "#flexibleSpan" concurrently
  React.useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".h1-line", {
      y: 500,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    }, 0);
    // Set duration to 1.2 so the letter spacing animation finishes when the last line completes its 0.8 duration (0.2 stagger * 2 + 0.8)
    tl.fromTo("#flexibleSpan", { letterSpacing: "0.1em" }, { letterSpacing: "0px", duration: 2, ease: "power2.out" }, 0);
  }, []);

  return (
    <div id="bg_hero" className="h-4/5 relative w-full overflow-hidden bg-[#fbfbfb] place-items-center">
      <div className="flex w-full place-content-center">
        <h1 className="font-title uppercase text-white/80 absolute bg-blend-hard-light text-center text-3xl sm:text-6xl sm:leading-none mt-5">
          <span className="h1-line inline-block">Das</span><br/>
          <span id="flexibleSpan" className="h1-line inline-block text-5xl sm:text-9xl leading-none">flexibelste Campingbett</span><br/>
          <span className="h1-line inline-block">für deinen Transporter oder Van</span>
        </h1>
      </div>

      <div className="w-full h-full">
        <HeroParallax className="w-full absolute" />
        <img src="/sky.png" className="w-full top-0 absolutes" />
      </div>
      
      <video
        ref={videoRef}
        // Removed onLoadedData attribute so playback is handled by the effect
        className="absolute sm:left-1/3 top-10"
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        muted
        width="1350"
        height="1350"
      >
        <source src="/kingsize-hero3.webm" type="video/webm" />
      </video>

      {/* Render progress bar in first segment */}
      {currentSegment === 0 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64">
          <input
            type="range"
            min="0"
            max={segments[0]}
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="w-full"
          />
        </div>
      )}

      {/* Render a button for each segment */}
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
  )
}
