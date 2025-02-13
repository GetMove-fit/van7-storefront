"use client"

import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import Einbauorte from "/public/einbauorte.jpg";

const cardData = [
  { name: "Card 1", image: "/path/to/image1.jpg" },
  { name: "Card 2", image: "/path/to/image2.jpg" },
  { name: "Card 3", image: "/path/to/image3.jpg" },
  { name: "Card 4", image: "/path/to/image4.jpg" },
  { name: "Card 5", image: "/path/to/image5.jpg" },
  { name: "Card 6", image: "/path/to/image6.jpg" },
];

const EinbauortSection = () => (
  <section className="flex flex-col gap-y-3 overflow-hidden">
    <div className="relative w-full h-[500px] px-48">
      <img src={Einbauorte.src} className="rounded h-[500px] w-full object-cover" />
      <div className="absolute inset-0 flex flex-col p-12 px-64 py-12 h-full justify-between">
        <h2 className="font-title text-7xl text-white">Wähle dein einbauort</h2>
        <p className="text-xl text-white max-w-2xl mt-4">
          Wähle dein Fahrzeug oder Einbauort aus der Liste aus und entdecke, wie sich das Hubbett nahtlos integrieren lässt. Probiere es jetzt aus und speichere deine Konfiguration, um jederzeit bequem fortzusetzen.
        </p>
      </div>
    </div>

    <div className="relative w-full pb-10 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-grey-90"></div>
      <Splide
        options={{
          type: "loop",
          perPage: 4.5,
          perMove: 1,
          arrows: true,
          pagination: false,
          gap: "1rem",
          drag: true,
          padding: { left: "192px" }
        }}
        className="relative"
      >
        {cardData.map((card, index) => (
          <SplideSlide key={index}>
            <div className="bg-white rounded-lg overflow-hidden p-5">
              <img src={card.image} alt={card.name} className="w-full h-[262px] object-cover" />
              <p className="text-center text-2xl font-bold uppercase mt-4">{card.name}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  </section>
);

export default EinbauortSection;