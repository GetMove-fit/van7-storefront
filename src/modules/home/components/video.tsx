"use client"

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import Background from "/public/video-background.png";
import StufenlosIcon from "/public/icons/stufenlos.svg";
import WaagrechtIcon from "/public/icons/waagrecht.svg";
import StabilFixiertIcon from "/public/icons/stabil-fixiert.svg";
import LattenrostIcon from "/public/icons/lattenrost.svg";

// Update FeatureCard to accept hover event props
const FeatureCard = ({ title, icon, text, progress = 100, isActive, onHoverEnter, onHoverLeave }: {
  title: string,
  text: string,
  icon: React.ReactNode,
  progress?: number,
  isActive?: boolean,
  onHoverEnter?: React.MouseEventHandler<HTMLDivElement>,
  onHoverLeave?: React.MouseEventHandler<HTMLDivElement>
}) => (
  <AccordionPrimitive.Item 
    value={title} 
    className="w-full relative"
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    {/* Vertical progress bar only visible when active */}
    {isActive && (
      <div className="absolute left-0 top-0 bottom-0">
        <div
          style={{ height: `${progress}%` }}
          className="w-2 bg-gradient-to-b from-[#231F20] to-[#CC181F] transition-all duration-300"
        />
      </div>
    )}
    {/* Add left padding to avoid overlap with progress bar */}
    <div className="w-full bg-white rounded-l">
      <AccordionPrimitive.Header className="w-full">
        <AccordionPrimitive.Trigger className="w-full flex justify-between py-5 px-8 group">
          <h2 className={`transition-colors duration-300 text-3xl font-title uppercase ${isActive ? "text-grey-90" : "text-grey-90/40 group-hover:text-grey-90/80"}`}>
            {title}
          </h2>
          <span className={`transition-all duration-300 ${isActive ? "" : "opacity-40 group-hover:opacity-80"}`}>
            {icon}
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden transition-all duration-300 data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-close">
        <div className="w-full px-8 pb-5 pt-0">
          <p className="text-xl">
            {text}
          </p>
        </div>
      </AccordionPrimitive.Content>
    </div>
  </AccordionPrimitive.Item>
);

// In VideoSection, add hover state and pause/resume effect
const VideoSection = ({ open = true }: { open?: boolean }) => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [videoHovered, setVideoHovered] = React.useState(false);
  const [cardHovered, setCardHovered] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Stufenlos Höhe einstellen",
      text: "Das Van7 Hubbett bietet besten Schlafkomfort und maximale Raumnutzung: stufenlos Höhenverstellbar oder am Dach verstaut.",
      icon: <StufenlosIcon />,
      timestamp: 7.5
    },
    {
      title: "Ausnivellieren",
      text: "Das Van7 Hubbett bietet besten Schlafkomfort und maximale Raumnutzung: stufenlos Höhenverstellbar oder am Dach verstaut.",
      icon: <WaagrechtIcon />,
      timestamp: 16
    },
    {
      title: "An der Wand fixieren",
      text: "Das Van7 Hubbett bietet besten Schlafkomfort und maximale Raumnutzung: stufenlos Höhenverstellbar oder am Dach verstaut.",
      icon: <StabilFixiertIcon />,
      timestamp: 28
    },
    {
      title: "Lattenrost ausziehen",
      text: "Das Van7 Hubbett bietet besten Schlafkomfort und maximale Raumnutzung: stufenlos Höhenverstellbar oder am Dach verstaut.",
      icon: <LattenrostIcon />,
      timestamp: 31
    }
    // ...add more features if needed
  ];

  const [accordionValue, setAccordionValue] = React.useState(open ? features[0].title : undefined);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleAccordionChange = (value: string | undefined) => {
    setAccordionValue(value);
    if (value) {
      const index = features.findIndex(feature => feature.title === value);
      const newTime = index === 0 ? 0 : features[index - 1].timestamp;
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }
  };

  // Pause video when either video or active feature card is hovered
  React.useEffect(() => {
    if (videoRef.current) {
      if (videoHovered || cardHovered) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [videoHovered, cardHovered]);

  React.useEffect(() => {
    const openFeature = features.find(feature => currentTime < feature.timestamp);
    setAccordionValue(openFeature ? openFeature.title : undefined);
  }, [currentTime]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play();
            } else {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full max-sm:flex-col flex gap-x-3 bg-grey-10 max-sm:mt-10">
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onMouseEnter={() => setVideoHovered(true)}
        onMouseLeave={() => setVideoHovered(false)}
        src="/NeueSerie.mp4"
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        muted
        width="1280"
        height="720"
        className="rounded-r"
      />

      <AccordionPrimitive.Root
        type="single"
        value={accordionValue}
        onValueChange={handleAccordionChange}
        className="w-full"
      >
        {features.map((feature, index) => {
          let computedProgress = 0;
          if (accordionValue === feature.title) {
            const segmentStart = index === 0 ? 0 : features[index - 1].timestamp;
            computedProgress = Math.min(((currentTime - segmentStart) / (feature.timestamp - segmentStart)) * 100, 100);
          }
          return (
            // Pass hover handlers only to the active card
            <FeatureCard
              key={feature.title}
              title={feature.title}
              text={feature.text}
              icon={feature.icon}
              progress={computedProgress}
              isActive={accordionValue === feature.title}
              onHoverEnter={accordionValue === feature.title ? () => setCardHovered(true) : undefined}
              onHoverLeave={accordionValue === feature.title ? () => setCardHovered(false) : undefined}
            />
          );
        })}
      </AccordionPrimitive.Root>
    </section>
  );
};

export default VideoSection;