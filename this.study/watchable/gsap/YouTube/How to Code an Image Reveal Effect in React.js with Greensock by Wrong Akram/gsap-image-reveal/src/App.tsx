import { Fragment, useRef, useLayoutEffect } from "react";
import { gsap, Power2 } from "gsap";
import CSSPlugin from "gsap/CSSPlugin";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import "./App.scss";
import peopleImg from "./images/people.jpg";

gsap.registerPlugin(CSSPlugin, CSSRulePlugin);

export const App = () => {
  const imageReveal = CSSRulePlugin.getRule(".img-container::after");
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current
      .to(containerRef.current, {
        duration: 0,
        visibility: "visible"
      })
      .to(imageReveal, {
        duration: 1.4,
        width: "0%",
        ease: Power2.easeInOut
      })
      .from(
        imageRef.current,
        {
          duration: 1.4,
          scale: 1.6,
          ease: Power2.easeInOut
        },
        "-=1.6"
      );

    return () => {
      tl.current?.kill();
    };
  }, [imageReveal]);

  return (
    <section className="main">
      <p>GSAP IMAGE REVEAL</p>
      <div ref={containerRef} className="container">
        <Fragment>
          <div className="img-container">
            <img ref={imageRef} src={peopleImg} alt="Two people" />
          </div>
        </Fragment>
      </div>
    </section>
  );
};
