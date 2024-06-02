import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Model = () => {
  useGSAP(() => {
    gsap.to("#heading", {
      opacity: 1,
      x: 0,
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading"></h1>
        Take a closer look.
      </div>
    </section>
  );
};

export default Model;
