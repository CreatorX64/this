import { useRef, useLayoutEffect } from "react";
import { gsap, Power3 } from "gsap";
import "./App.scss";
import arrowImg from "./images/arrow-right.svg";
import girlImg from "./images/girl.webp";
import boyImg from "./images/boy.webp";

export const App = () => {
  let tl = useRef<gsap.core.Timeline>();
  const heroRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Remove the initial flash
    gsap.to(heroRef.current, {
      duration: 0,
      visibility: "visible"
    });

    tl.current = gsap.timeline({ delay: 0.6 });

    // Images animation

    const girlImage = imagesRef!.current?.firstElementChild as HTMLElement;
    const boyImage = imagesRef!.current?.lastElementChild as HTMLElement;

    tl.current
      .from(
        girlImage,
        {
          duration: 1.2,
          y: 1280,
          ease: Power3.easeOut
        },
        "Start"
      )
      .from(
        girlImage.firstElementChild,
        {
          duration: 2,
          scale: 1.6,
          ease: Power3.easeOut
        },
        "-=1"
      )
      .from(
        boyImage,
        {
          duration: 1.2,
          y: 1280,
          ease: Power3.easeOut
        },
        "-=2"
      )
      .from(
        boyImage.firstElementChild,
        {
          duration: 2,
          scale: 1.6,
          ease: Power3.easeOut
        },
        "-=1.6"
      );

    // Content animation

    const headlineFirst = contentRef!.current?.children[0]
      .children[0] as HTMLHeadingElement;
    const headlineSecond =
      headlineFirst.nextElementSibling as HTMLHeadingElement;
    const headlineThird =
      headlineSecond.nextElementSibling as HTMLHeadingElement;
    const contentParagraph = contentRef!.current
      ?.children[1] as HTMLParagraphElement;
    const contentButton = contentRef!.current?.children[2] as HTMLButtonElement;

    tl.current
      .from(
        [
          headlineFirst.firstElementChild,
          headlineSecond.firstElementChild,
          headlineThird.firstElementChild
        ],
        {
          duration: 1,
          y: 44,
          ease: Power3.easeOut,
          delay: 0.8,
          stagger: 0.15
        },
        "Start"
      )
      .from(
        contentParagraph,
        {
          duration: 1,
          y: 20,
          opacity: 0,
          ease: Power3.easeOut
        },
        "-=1.4"
      )
      .from(
        contentButton,
        {
          duration: 1,
          y: 20,
          opacity: 0,
          ease: Power3.easeOut,
          onComplete() {
            heroRef.current!.style.overflow = "auto";
          }
        },
        "-=1.2"
      );

    return () => {
      tl.current && tl.current.kill();
    };
  }, []);

  return (
    <div ref={heroRef} className="hero">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <div ref={contentRef} className="hero__title-container">
              <h1 className="hero__title">
                <span className="hero__line">
                  <span className="hero__line-inner">Relieving the burden</span>
                </span>
                <span className="hero__line">
                  <span className="hero__line-inner">of disease caused</span>
                </span>
                <span className="hero__line">
                  <span className="hero__line-inner">by behaviors.</span>
                </span>
              </h1>
              <p className="hero__desc">
                Better treats serious cardiometabolic diseases to transform
                lives and reduce healthcare utilization through the use of
                digital therapeutics.
              </p>
              <div className="button-row">
                <button className="button">
                  explore
                  <span className="button__icon">
                    <img src={arrowImg} alt="Arrow icon" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="hero__images">
            <div ref={imagesRef} className="hero__images-container">
              <div className="hero__image-container hero__image-container--girl">
                <img src={girlImg} alt="Girl" className="hero__image" />
              </div>
              <div className="hero__image-container hero__image-container--boy">
                <img src={boyImg} alt="Boy" className="hero__image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
