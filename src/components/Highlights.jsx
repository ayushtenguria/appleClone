import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      delay: 1,
      y: 0,
    });
    gsap.to(".link", {
      opacity: 1,
      delay: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.25,
    });
  }, []);
  return (
    <>
      <section
        id="highlights"
        className="overflow-hidden w-screen h-full common-padding bg-zinc"
      >
        <div className="screen-max-width">
          <div className="w-full mb-12 justify-between md:flex items-end">
            <h1 className="section-heading" id="title">
              {" "}
              Get the highlights
            </h1>
            <div className="flex flex-wrap gap-5 items-end">
              <div className="link">
                <p className="link">Watch the film</p>
                <img src={watchImg} alt="watch" className="ml-2" />
              </div>
              <div className="link">
                <p className="link">Watch the event</p>
                <img src={rightImg} alt="right" className="ml-2" />
              </div>
            </div>
          </div>
          <VideoCarousel />
        </div>
      </section>
    </>
  );
};

export default Highlights;
