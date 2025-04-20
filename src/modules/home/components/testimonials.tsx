"use client";
import { useEffect, useRef, useState } from "react";
import kundenBild1 from "/public/kundengalerie/kundenbild1.png";
import kundenBild2 from "/public/kundengalerie/kundenbild2.png";
import kundenBild3 from "/public/kundengalerie/kundenbild3.png";
import kundenBild4 from "/public/kundengalerie/kundenbild4.png";
import kundenBild5 from "/public/kundengalerie/kundenbild5.png";
import kundenBild6 from "/public/kundengalerie/kundenbild6.png";
import kundenBild7 from "/public/kundengalerie/kundenbild7.png";
import kundenBild8 from "/public/kundengalerie/kundenbild8.png";
import kundenBild9 from "/public/kundengalerie/kundenbild9.png";
import kundenBild10 from "/public/kundengalerie/kundenbild10.png";
import Stars from "/public/stars.svg";
import Quotes from "/public/quotes.svg";
import { useTranslations } from "next-intl";

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("home.reviews");
  const words = [
    "adventurers",
    "campers",
    "motorsports",
    "outdoorSports",
    "handyman",
  ].map((word) => t(`audience.${word}`));
  const [currentWord, setCurrentWord] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const testimonials = [
    "Habe einige Nächte in diesem Bett verbracht und bin begeistert, sehr komfortabel und gemütlich. Das Ausrichten und Fixieren des Hubbettens gestaltet sich spielend leicht. Alles in allem eine sehr gute Investition.",
    "Absolut geniales Produkt! Nicht nur das dadurch der Innenraum des Fahrzeugs wesentlich flexibler und multifunktionaler nutzbar wird, auch die technischen Details und die Qualität sind herausragend. Nebenbei bemerkt ist auch das Team hinter Van7 sehr engagiert und hilfsbereit. 6 Sterne",
    "Einfach Top, wenn man in seinen Bus oder Van ein Bett einbauen möchte. So haben wir maximalen Platz um die Mountainbikes oder das Motorrad zu verstauen und durch das ausnivellieren des Bettes ink. Fixierfunktion hat man immer eine waagerechte Position beim schlafen und kann am nächsten Tag wieder voll durchstarten. Kann ich nur jedem weiterempfehlen.",
    "Ich bin mit meinem Bett super zufrieden!! Endlich mehr Platz im Wagen zu haben erleichtert mir beim Campen einiges, kann das Van7 Bett nur weiterempfehlen!!",
    "Super intelligentes Ablagesystem, sehr gute Verarbeitung, und kompetenter/freundlicher Ansprechpartner! Immer gerne!",
  ];

  // Duplicate testimonials to create continuous scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (window.innerWidth >= 640) {
              // only animate on screens above sm
              // For left images
              document
                .querySelectorAll<HTMLImageElement>(".fade-in-left")
                .forEach((img) => {
                  const duration = `${Math.random() * 2 + 1}s`;
                  const delay = `${Math.random() * 2}s`;
                  img.style.animationDuration = duration;
                  img.style.animationDelay = delay;
                  img.classList.add("animate-fade-in-left");
                });
              // For right images
              document
                .querySelectorAll<HTMLImageElement>(".fade-in-right")
                .forEach((img) => {
                  const duration = `${Math.random() * 2 + 1}s`;
                  const delay = `${Math.random() * 2}s`;
                  img.style.animationDuration = duration;
                  img.style.animationDelay = delay;
                  img.classList.add("animate-fade-in-right");
                });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Replace the animated switching word effect with a simple state update to avoid distraction
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      id="bewertungen"
      ref={sectionRef}
      className="relative flex w-full items-center justify-between gap-y-5 overflow-hidden bg-grey-5 py-10 max-sm:flex-col"
    >
      <div className="flex items-start gap-2.5 max-sm:px-5 sm:items-center sm:max-xl:flex-col">
        <div className="flex flex-col gap-y-2.5">
          <img
            className="fade-in-left sm:opacity-0"
            src={kundenBild1.src}
            alt="Customer 1"
            width={kundenBild1.width}
            height={kundenBild1.height}
          />
          <img
            className="fade-in-left sm:opacity-0"
            src={kundenBild2.src}
            alt="Customer 2"
            width={kundenBild2.width}
            height={kundenBild2.height}
          />
          <img
            className="fade-in-left max-sm:hidden sm:opacity-0"
            src={kundenBild3.src}
            alt="Customer 3"
            width={kundenBild3.width}
            height={kundenBild3.height}
          />
        </div>
        <div className="flex flex-col gap-y-2.5 max-sm:flex-col-reverse">
          <img
            className="fade-in-left sm:opacity-0"
            src={kundenBild4.src}
            alt="Customer 4"
            width={kundenBild4.width}
            height={kundenBild4.height}
          />
          <img
            className="fade-in-left sm:opacity-0"
            src={kundenBild5.src}
            alt="Customer 5"
            width={kundenBild5.width}
            height={kundenBild5.height}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-5 pt-10 max-sm:w-full">
        <div className="flex flex-col items-center gap-y-5">
          <Stars />
          <h2 className="text-center font-title text-5xl sm:text-7xl">
            {t("title")}
            <br />
            <span ref={wordRef}>{words[currentWord]}</span>
          </h2>
        </div>
        <Quotes className="absolute z-20 translate-y-44 place-self-center max-sm:scale-50" />

        {/* Testimonial Marquee Container */}
        <div
          ref={marqueeRef}
          className="relative flex h-[600px] w-full max-w-4xl flex-col items-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Marquee Content */}
          <div
            className={`flex flex-col gap-10 ${isPaused ? "animate-pause" : "animate-marquee"}`}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {duplicatedTestimonials.map((text, index) => (
              <div
                key={index}
                className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md"
              >
                <p className="text-center text-xl sm:text-2xl">{text}</p>
              </div>
            ))}
          </div>

          {/* Gradient overlay for smooth fading effect at top and bottom */}
          <div className="absolute left-0 right-0 top-0 z-10 h-20 bg-gradient-to-b from-grey-5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-grey-5 to-transparent"></div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 max-sm:px-5 sm:max-xl:flex-col">
        <div className="flex flex-col items-end gap-y-2.5">
          <img
            className="fade-in-right sm:opacity-0"
            src={kundenBild6.src}
            alt="Customer 6"
            width={kundenBild6.width}
            height={kundenBild6.height}
          />
          <img
            className="sm:hidden"
            src={kundenBild3.src}
            alt="Customer 3"
            width={kundenBild3.width}
            height={kundenBild3.height}
          />
          <img
            className="fade-in-right sm:opacity-0"
            src={kundenBild7.src}
            alt="Customer 7"
            width={kundenBild7.width}
            height={kundenBild7.height}
          />
        </div>
        <div className="flex flex-col items-end gap-y-2.5">
          <img
            className="fade-in-right sm:opacity-0"
            src={kundenBild8.src}
            alt="Customer 8"
            width={kundenBild8.width}
            height={kundenBild8.height}
          />
          <img
            className="fade-in-right sm:opacity-0"
            src={kundenBild9.src}
            alt="Customer 9"
            width={kundenBild9.width}
            height={kundenBild9.height}
          />
          <img
            className="fade-in-right sm:opacity-0"
            src={kundenBild10.src}
            alt="Customer 10"
            width={kundenBild10.width}
            height={kundenBild10.height}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
