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
  <section className="flex flex-col gap-y-3 overflow-hidden max-sm:mt-5">
    <div className="relative w-full h-80 xl:h-[500px] px-5 sm:px-48">
      <img src={Einbauorte.src} className="rounded h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col px-10 sm:px-64 py-5 sm:py-12 h-full justify-between">
        <h2 className="font-title text-5xl sm:text-7xl text-white">Wähle dein einbauort</h2>
        <p className="sm:text-xl text-white max-w-2xl mt-4">
          Wähle dein Fahrzeug oder Einbauort aus der Liste aus und entdecke, wie sich das Hubbett nahtlos integrieren lässt.
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
          breakpoints: {
            600: {
              padding: {
                left: "20px"
              },
              gap: "0.5rem"
            },
            1000: {
              padding: { left: "192px" }
            }
          },
        }}
        className="relative"
      >
        {cardData.map((card, index) => (
          <SplideSlide key={index}>
            <div className="bg-white rounded-lg overflow-hidden p-5">
              <img src={card.image} alt={card.name} className="w-full object-cover sm:h-[262px]" />
              <p className="text-center text-2xl font-bold uppercase mt-4">{card.name}</p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  </section>
);

export default EinbauortSection;