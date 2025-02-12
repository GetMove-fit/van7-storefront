import { Parallax } from "@modules/home/components/hero/parallax"

const Hero = () => <div className="relative h-[85vh] flex-col flex items-center bg-grey-90 gap-y-5">
  <Parallax />
  <button className="uppercase bg-gradient-to-b from-brand-light to-brand-dark font-bold text-white py-5 px-6 rounded h-fit text-2xl leading-none hover:shadow-brand-highlight/30 hover:shadow-lg transition-shadow">
    Neue Serie vorbestellen
  </button>
</div>

export default Hero
