"use client";
import Stars from "/public/stars.svg";
import React from "react";
import InteractiveVideo from "../interactive-video";
import Vorteile from "./vorteile";

const Hero = () => {
  return (
    <section className="relative flex overflow-hidden bg-gradient-to-b from-grey-5 to-white py-6 pl-5 max-sm:flex-col sm:py-10 sm:pl-36">
      <div className="flex flex-col gap-y-6 sm:gap-y-10">
        <div className="flex flex-col gap-y-4 text-lg sm:gap-y-6 sm:text-2xl">
          <div className="flex gap-x-4">
            <Stars className="max-sm:w-32" />
            500+ zufriedene Kunden
          </div>

          <h1 className="font-title text-[40px] uppercase leading-none text-grey-90 sm:text-[80px]">
            Das Hubbett
            <br />
            mit dem höchsten
            <br />
            Komfort & Raumnutzung
            <br />
          </h1>

          <p className="hidden sm:block">
            Stelle die perfekte Höhe ein und hol das Beste aus deinem Raum
            heraus.
            <br />
            Ausnivellieren und Schlafkomfort genießen wie Zuhause - egal wo du
            parkst.
          </p>
        </div>

        <Vorteile />

        <button className="h-fit w-fit rounded bg-gradient-to-b from-brand-light to-brand-dark px-6 py-4 font-bold uppercase leading-none text-white transition-shadow hover:shadow-lg hover:shadow-brand-highlight/30 sm:py-5 sm:text-xl md:text-2xl">
          Neue Serie vorbestellen
        </button>
      </div>

      <InteractiveVideo />
    </section>
  );
};

export default Hero;
