import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleSetVideoSrc = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleSetVideoSrc);

    return () => {
      window.removeEventListener("resize", handleSetVideoSrc);
    };
  });

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });

    gsap.to("#cta", {
      opacity: 1,
      delay: 2,
      y: -50,
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="w-full flex-center h-5/6 flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            key={videoSrc}
            playsInline={true}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col translate-y-20 opacity-0 items-center"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
