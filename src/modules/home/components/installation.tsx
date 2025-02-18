import React from "react";
import Einbaupartner from "/public/einbaupartner.png";
import Anleitung from "/public/anleitung.png";

const Installation = () => {
  return (
    <section className="flex gap-8 bg-white px-5 py-16 max-sm:flex-col sm:px-48">
      <a href="" className="relative flex w-full flex-col">
        <img
          src={Einbaupartner.src}
          alt="Karte mit Einbaupartner in der EU"
          width={Einbaupartner.width}
          height={Einbaupartner.height}
          className="h-fill w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-grey-90/40 to-grey-90" />
        <div className="absolute bottom-0 flex flex-col items-center justify-center p-2 py-4 text-lg text-white sm:p-12 sm:text-2xl">
          Installation
          <h2 className="text-center font-title text-3xl font-bold tracking-wider sm:text-5xl">
            Installateur finden
          </h2>
          <p className="mt-5 text-center sm:mt-8">
            Sorgloser Einbau durch unsere Einbaupartner. Schnell und
            zuverlässig, damit du dich voll und ganz auf dein Abenteuer
            konzentrieren kannst.
          </p>
          <p className="mt-4 font-bold uppercase sm:mt-8">Mehr erfahren</p>
        </div>
      </a>

      <a href="" className="relative flex h-fit w-full flex-col">
        <img
          src={Anleitung.src}
          alt="Karte mit Anleitung in der EU"
          width={Anleitung.width}
          height={Anleitung.height}
          className="h-fill w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-grey-90/40 to-grey-90" />
        <div className="absolute bottom-0 flex flex-col items-center justify-center p-2 py-4 text-lg text-white sm:p-12 sm:text-2xl">
          Installation
          <h2 className="font-title text-3xl font-bold tracking-wider sm:text-5xl">
            DIY Anleitung
          </h2>
          <p className="mt-5 text-center sm:mt-8">
            Für viele beginnt das Abenteuer schon vor dem ersten Roadtrip.
            Unsere Videos zeigen dir, wie du das Bett mühelos und schnell
            montierst.
          </p>
          <p className="mt-4 font-bold uppercase sm:mt-8">Mehr erfahren</p>
        </div>
      </a>
    </section>
  );
};

export default Installation;
