"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import StufenlosIcon from "/public/icons/funktionen/stufenlos.svg";
import WaagrechtIcon from "/public/icons/funktionen/waagrecht.svg";
import StabilFixiertIcon from "/public/icons/funktionen/stabil-fixiert.svg";
import LattenrostIcon from "/public/icons/funktionen/lattenrost.svg";
import { useTranslations } from "next-intl";

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
  icon: React.ReactNode;
  progress?: number;
  isActive?: boolean;
  onHoverEnter?: React.MouseEventHandler<HTMLDivElement>;
  onHoverLeave?: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <AccordionPrimitive.Item
    value={title}
    className="relative w-full overflow-hidden rounded-l"
    onMouseEnter={onHoverEnter}
    onMouseLeave={onHoverLeave}
  >
    {/* Vertical progress bar only visible when active */}
    {isActive && (
      <div className="absolute bottom-0 left-0 top-0">
        <div
          style={{ height: `${progress}%` }}
          className="w-2 bg-gradient-to-b from-[#231F20] to-[#CC181F] transition-all duration-300"
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

// In VideoSection, add hover state and pause/resume effect
const VideoSection = ({ open = true }: { open?: boolean }) => {
  const [currentTime, setCurrentTime] = React.useState(0);
  const [videoHovered, setVideoHovered] = React.useState(false);
  const [cardHovered, setCardHovered] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const t = useTranslations("home.features");
  const features = [
    {
      title: t("setHeight.title"),
      text: t("setHeight.text"),
      icon: <StufenlosIcon />,
      timestamp: 7.5,
    },
    {
      title: t("levelOut.title"),
      text: t("levelOut.text"),
      icon: <WaagrechtIcon />,
      timestamp: 16,
    },
    {
      title: t("fix.title"),
      text: t("fix.text"),
      icon: <StabilFixiertIcon />,
      timestamp: 28,
    },
    {
      title: t("extend.title"),
      text: t("extend.text"),
      icon: <LattenrostIcon />,
      timestamp: 31,
    },
    // ...add more features if needed
  ];

  const [accordionValue, setAccordionValue] = React.useState(
    open ? features[0].title : undefined
  );

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleAccordionChange = (value: string | undefined) => {
    setAccordionValue(value);
    if (value) {
      const index = features.findIndex((feature) => feature.title === value);
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
    const openFeature = features.find(
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
      className="flex w-full gap-x-3 bg-grey-10 pb-5 max-lg:flex-col max-sm:mt-10"
    >
      <video
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        onMouseEnter={() => setVideoHovered(true)}
        onMouseLeave={() => setVideoHovered(false)}
        onTouchStart={() => setVideoHovered(true)} // added for mobile hold pause
        onTouchEnd={() => setVideoHovered(false)} // added for mobile hold resume
        src="/videos/NeueSerie.mp4"
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        muted
        loop
        className="w-full min-w-0 rounded-r"
      />

      <AccordionPrimitive.Root
        type="single"
        value={accordionValue}
        onValueChange={handleAccordionChange}
        className="w-full space-y-3 lg:max-w-lg xl:max-w-xl 3xl:space-y-5" // fixed accordion width
      >
        {features.map((feature, index) => {
          let computedProgress = 0;
          if (accordionValue === feature.title) {
            const segmentStart =
              index === 0 ? 0 : features[index - 1].timestamp;
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
                  ? () => setCardHovered(true)
                  : undefined
              }
              onHoverLeave={
                accordionValue === feature.title
                  ? () => setCardHovered(false)
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
