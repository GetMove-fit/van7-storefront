"use client"
import Stars from "/public/stars.svg"
import Check from "/public/check.svg"
import React from "react"
import InteractiveVideo from "../interactive-video"

const Hero = () => {
  return <section className="flex pl-5 sm:pl-36 py-6 sm:py-10 overflow-hidden relative max-sm:h-screen">
  <div className="flex flex-col gap-y-6 sm:gap-y-10">
    <div className="flex flex-col gap-y-4 sm:gap-y-6 text-lg sm:text-2xl">
      <div className="flex gap-x-4">
        <Stars className="" />
        500+ zufriedene Kunden
      </div>

      <h1 className="text-5xl sm:text-8xl leading-none uppercase font-title">
        Das Hubbett<br/>mit dem höchsten<br/>Komfort & Raumnutzung<br/>
      </h1>

      <p className="hidden sm:block">
        Stelle die perfekte Höhe ein und hol das Beste aus deinem Raum heraus.<br/>
        Ausnivellieren und Schlafkomfort genießen wie Zuhause - egal wo du parkst.
      </p>
    </div>

    <div className="flex flex-col text-lg sm:text-xl">
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

    <button className="uppercase bg-gradient-to-b from-brand-light to-brand-dark font-bold text-white py-5 px-6 rounded h-fit text-xl sm:text-2xl leading-none hover:shadow-brand-highlight/30 hover:shadow-lg transition-shadow w-fit">
      Neue Serie vorbestellen
    </button>
  </div>
  
  <InteractiveVideo />
</section>
}

export default Hero
