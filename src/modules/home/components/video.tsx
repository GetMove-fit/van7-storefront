import Background from "/public/video-background.png";

const VideoSection = () =>
<section className="w-full flex flex-col bg-grey-90 items-center content-center">
<img src={Background.src} className="absolute" />
  <video
    src="/NeueSerie.mp4"
    className="border-8 border-white z-20 mt-[17px]"
    playsInline
    webkit-playsinline="true"
    preload="metadata"
    muted
    width="1280"
    height="720"/>
</section>

export default VideoSection;