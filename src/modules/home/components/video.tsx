"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { clx } from "@medusajs/ui";

// Update FeatureCard to accept hover event props
const FeatureCard = ({
  title,
  icon,
  text,
  progress = 100,
  isActive,
  onHoverEnter,
  onHoverLeave,
}: {
  title: string;
  text: string;
  icon?: React.ReactNode;
  progress?: number;
  isActive?: boolean;
  onHoverEnter?: React.MouseEventHandler<HTMLDivElement>;
  onHoverLeave?: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <AccordionPrimitive.Item
    value={title}
    className="relative w-full overflow-hidden"
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    {/* Vertical progress bar only visible when active */}
    {isActive && (
      <div className="absolute bottom-0 left-0 top-0">
        <div
          style={{ height: `${progress}%` }}
          className="w-2 bg-gradient-to-b from-[#231F20] to-[#CC181F] transition-all duration-300 ease-linear"
        />
      </div>
    )}
    {/* Add left padding to avoid overlap with progress bar */}
    <div className="w-full bg-white">
      <AccordionPrimitive.Header className="w-full">
        <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between px-8 py-5">
          <h2
            className={`text-left font-title text-2xl uppercase transition-colors duration-300 sm:text-3xl ${
              isActive
                ? "text-grey-90"
                : "text-grey-90/40 group-hover:text-grey-90/80"
            }`}
          >
            {title}
          </h2>
          <span
            className={`transition-all duration-300 ${
              isActive ? "" : "opacity-40 group-hover:opacity-80"
            }`}
          >
            {icon}
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open">
        <div className="w-full px-8 pb-5 pt-0">
          <p className="sm:text-xl">{text}</p>
        </div>
      </AccordionPrimitive.Content>
    </div>
  </AccordionPrimitive.Item>
);

// Make VideoSection universal by accepting videoSrc and sections as props
const VideoSection = ({
  videoSrc,
  sections,
  open = true,
  children,
  className,
}: {
  videoSrc: string;
  sections: {
    title: string;
    text: string;
    icon?: React.ReactNode;
    timestamp: number;
  }[];
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [accordionValue, setAccordionValue] = React.useState(
    open ? sections[0].title : undefined
  );

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleAccordionChange = (value: string | undefined) => {
    setAccordionValue(value);
    if (value) {
      const index = sections.findIndex((feature) => feature.title === value);
      const newTime = index === 0 ? 0 : sections[index - 1].timestamp;
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }
  };

  // Pause video when hovered
  React.useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isHovered]);

  React.useEffect(() => {
    const openFeature = sections.find(
      (feature) => currentTime < feature.timestamp
    );
    setAccordionValue(openFeature ? openFeature.title : undefined);
  }, [currentTime]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
    <section
      ref={containerRef}
      className={clx("flex w-full gap-5 max-lg:flex-col", className)}
    >
      {children}
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)} // added for mobile hold pause
        onTouchEnd={() => setIsHovered(false)} // added for mobile hold resume
        src={videoSrc}
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        muted
        loop
        className="h-full w-full min-w-0"
      />

      <AccordionPrimitive.Root
        type="single"
        value={accordionValue}
        onValueChange={handleAccordionChange}
        className="w-full space-y-3 lg:max-w-lg xl:max-w-xl 3xl:space-y-5"
      >
        {sections.map((feature, index) => {
          let computedProgress = 0;
          if (accordionValue === feature.title) {
            const segmentStart =
              index === 0 ? 0 : sections[index - 1].timestamp;
            computedProgress = Math.min(
              ((currentTime - segmentStart) /
                (feature.timestamp - segmentStart)) *
                100,
              100
            );
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
              onHoverEnter={
                accordionValue === feature.title
                  ? () => setIsHovered(true)
                  : undefined
              }
              onHoverLeave={
                accordionValue === feature.title
                  ? () => setIsHovered(false)
                  : undefined
              }
            />
          );
        })}
      </AccordionPrimitive.Root>
    </section>
  );
};

export default VideoSection;
