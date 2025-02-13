"use client"
import React from "react"

export default function InteractiveVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const segments = [4, 7, 9, 15]
  const [currentSegment, setCurrentSegment] = React.useState(0)
  const [showButton, setShowButton] = React.useState(false)

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.play()
  }, [])

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
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 space-x-4">
        {segments.map((ts, idx) => (
          <button
            key={idx}
            disabled={!(showButton && currentSegment === idx)}
            onClick={() => {
              setShowButton(false)
              setCurrentSegment(currentSegment + 1)
              if (videoRef.current) videoRef.current.play()
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Continue {idx + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
