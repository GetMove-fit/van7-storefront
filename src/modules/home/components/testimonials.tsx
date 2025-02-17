"use client";
import { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
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

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const splideRef = useRef<any>(null);
  const words = [
    "Abenteuerern",
    "Campern",
    "Motorsportlern",
    "Outdoorsportlern",
    "Handwerkern",
  ];
  const [currentWord, setCurrentWord] = useState(0);
  const testimonials = [
    "Habe einige Nächte in diesem Bett verbracht und bin begeistert, sehr komfortabel und gemütlich. Das Ausrichten und Fixieren des Hubbettens gestaltet sich spielend leicht. Alles in allem eine sehr gute Investition.",
    "Absolut geniales Produkt! Nicht nur das dadurch der Innenraum des Fahrzeugs wesentlich flexibler und multifunktionaler nutzbar wird, auch die technischen Details und die Qualität sind herausragend. Nebenbei bemerkt ist auch das Team hinter Van7 sehr engagiert und hilfsbereit. 6 Sterne",
    "Einfach Top, wenn man in seinen Bus oder Van ein Bett einbauen möchte. So haben wir maximalen Platz um die Mountainbikes oder das Motorrad zu verstauen und durch das ausnivellieren des Bettes ink. Fixierfunktion hat man immer eine waagerechte Position beim schlafen und kann am nächsten Tag wieder voll durchstarten. Kann ich nur jedem weiterempfehlen.",
    "Ich bin mit meinem Bett super zufrieden!! Endlich mehr Platz im Wagen zu haben erleichtert mir beim Campen einiges, kann das Van7 Bett nur weiterempfehlen!!",
    "Super intelligentes Ablagesystem, sehr gute Verarbeitung, und kompetenter/freundlicher Ansprechpartner! Immer gerne!",
  ];
  const [progress, setProgress] = useState(0);
  // New state to pause progress when hovering
  const [isPaused, setIsPaused] = useState(false);

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

  // Update progress for autoplay (only update when not paused)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (splideRef.current?.splide) {
      intervalId = setInterval(() => {
        if (!isPaused) {
          setProgress((prev) => (prev >= 100 ? 0 : prev + 1)); // increment changed to 1
        }
      }, 100);
      splideRef.current.splide.on("moved", () => setProgress(0));
    }
    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section
      id="bewertungen"
      ref={sectionRef}
      className="max-sm:pt-5 flex max-sm:flex-col gap-y-5 items-center justify-between w-full overflow-hidden relative sm:py-20 bg-grey-5"
    >
      <div className="flex items-start sm:items-center gap-x-2.5 max-sm:px-5">
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
            className="fade-in-left sm:opacity-0 max-sm:hidden"
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

      <div className="flex flex-col gap-y-5 sm:gap-y-16 items-center max-sm:w-full">
        <div className="flex flex-col gap-y-5 items-center">
          <Stars />
          <h2 className="text-5xl sm:text-7xl text-center font-title">
            Das beliebteste Hubbett von
            <br />
            <span ref={wordRef}>{words[currentWord]}</span>
          </h2>
        </div>
        <Quotes className="absolute translate-y-44 place-self-center max-sm:scale-50" />
        <div
          className="max-w-4xl w-full overflow-hidden flex flex-col items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Custom arrow container with progress ring between arrows */}
          <div className="flex justify-center items-center gap-x-5 mb-2">
            <button
              onClick={() => splideRef.current?.splide.go("<")}
              className="bg-gray-200 p-2 rounded"
            >
              ◀
            </button>
            <svg className="w-6 h-6" viewBox="0 0 36 36">
              <path
                className="fill-none stroke-grey-40"
                strokeWidth="4"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="fill-none stroke-brand-highlight"
                strokeWidth="4"
                strokeDasharray="100, 100"
                strokeDashoffset={100 - progress}
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <button
              onClick={() => splideRef.current?.splide.go(">")}
              className="bg-gray-200 p-2 rounded"
            >
              ▶
            </button>
          </div>
          <Splide
            ref={splideRef}
            options={{
              perPage: 1,
              rewind: true,
              autoplay: true,
              interval: 10000,
              arrows: false, // disabled default arrows
              drag: true,
              pagination: true,
              pauseOnHover: true,
            }}
            className="w-full px-5 sm:px-20 pt-5 pb-8"
          >
            {testimonials.map((text, index) => (
              <SplideSlide key={index}>
                <p className="text-xl sm:text-2xl text-center">{text}</p>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>

      <div className="flex items-center gap-x-2.5 max-sm:px-5">
        <div className="flex flex-col gap-y-2.5 items-end">
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
        <div className="flex flex-col gap-y-2.5 items-end">
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
