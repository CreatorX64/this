import { useRef, useLayoutEffect, useState } from "react";
import { gsap, Power3 } from "gsap";

import leftArrowImg from "./assets/arrow-left.svg";
import rightArrowImg from "./assets/arrow-right.svg";
import slideImg1 from "./assets/image.jpg";
import slideImg2 from "./assets/image2.jpg";
import slideImg3 from "./assets/image3.jpg";

import "reset-css";
import "./App.scss";

const testimonials = [
  {
    name: "Julia Cameron",
    title: "Creative Director, VISA",
    image: slideImg3,
    quote:
      "It's all good. I was amazed at the quality of the Design. We've seen amazing results already."
  },
  {
    name: "Mark Jacobs",
    title: "Tech Lead, Google",
    image: slideImg1,
    quote:
      "The rebranding has really helped our business. Definitely worth the investment."
  },
  {
    name: "Lisa Bearings",
    title: "Brand Coordinator, Facebook",
    image: slideImg2,
    quote:
      "The service was excellent. Absolutely wonderful! A complete redesign did it for us."
  }
];

export const App = (): JSX.Element => {
  const [state, setState] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false
  });

  const imageListRef = useRef<HTMLUListElement>(null);
  const testimonialListRef = useRef<HTMLUListElement>(null);

  const imageWidth = 340;

  useLayoutEffect(() => {
    gsap.to(testimonialListRef.current!.children[0], {
      duration: 0,
      opacity: 1
    });
  }, []);

  const slideLeft = (
    index: number,
    duration: number,
    multiplied: number = 1
  ): void => {
    gsap.to(imageListRef.current!.children[index], {
      duration: duration,
      x: -imageWidth * multiplied,
      ease: Power3.easeOut
    });
  };

  const slideRight = (
    index: number,
    duration: number,
    multiplied: number = 1
  ): void => {
    gsap.to(imageListRef.current!.children[index], {
      duration: duration,
      x: imageWidth * multiplied,
      ease: Power3.easeOut
    });
  };

  const scale = (index: number, duration: number): void => {
    gsap.from(imageListRef.current!.children[index], {
      duration: 1,
      scale: 1.2,
      ease: Power3.easeOut
    });
  };

  const fadeOut = (index: number, duration: number): void => {
    gsap.to(testimonialListRef.current!.children[index], {
      duration,
      opacity: 0
    });
  };

  const fadeIn = (index: number, duration: number): void => {
    gsap.to(testimonialListRef.current!.children[index], {
      duration,
      opacity: 1,
      delay: 1
    });
  };

  const nextSlide = (): void => {
    if (state.isActive1) {
      setState({ isActive1: false, isActive2: true, isActive3: false });

      // Animate image
      slideLeft(0, 1);
      slideLeft(1, 1);
      scale(1, 1);
      slideLeft(2, 0);

      // Animate text content
      fadeOut(0, 1);
      fadeIn(1, 1);
    } else if (state.isActive2) {
      setState({ isActive1: false, isActive2: false, isActive3: true });

      // Animate image
      slideLeft(1, 1, 2);
      slideLeft(2, 1, 2);
      scale(2, 1);
      slideRight(0, 1);

      // Animate text content
      fadeOut(1, 1);
      fadeIn(2, 1);
    } else if (state.isActive3) {
      setState({ isActive1: true, isActive2: false, isActive3: false });

      // Animate image
      slideLeft(2, 1, 3);
      slideLeft(0, 1, 0);
      scale(0, 1);
      slideLeft(1, 0, 0);

      // Animate text content
      fadeOut(2, 1);
      fadeIn(0, 1);
    }
  };

  const prevSlide = () => {
    if (state.isActive1) {
      setState({ isActive1: false, isActive2: false, isActive3: true });

      // Animate image
      slideLeft(2, 0, 3);
      slideLeft(2, 1, 2);
      scale(2, 1);
      slideRight(0, 1);
      slideRight(1, 1);

      // Animate text content
      fadeOut(0, 1);
      fadeIn(2, 1);
    } else if (state.isActive2) {
      setState({ isActive1: true, isActive2: false, isActive3: false });

      // Animate image
      slideLeft(0, 0);
      slideRight(0, 1, 0);
      slideRight(1, 1, 0);
      slideRight(2, 1, 2);
      scale(0, 1);

      // Animate text content
      fadeOut(1, 1);
      fadeIn(0, 1);
    } else if (state.isActive3) {
      setState({ isActive1: false, isActive2: true, isActive3: false });

      // Animate image
      slideLeft(2, 1);
      slideLeft(1, 0, 2);
      slideLeft(1, 1);
      scale(1, 1);

      // Animate text content
      fadeOut(2, 1);
      fadeIn(1, 1);
    }
  };

  return (
    <div className="testimonials">
      <div className="testimonials__container">
        <div className="arrow arrow--left" onClick={prevSlide}>
          <span>
            <img src={leftArrowImg} alt="Left arrow icon" />
          </span>
        </div>
        <div className="testimonials__inner">
          <div className="testimonials__image-box">
            <ul ref={imageListRef} className="testimonials__image-list">
              <li
                className={`testimonials__image-list-item ${
                  state.isActive1 ? "active" : ""
                }`}
              >
                <img
                  src={testimonials[0].image}
                  className="testimonials__image"
                  alt={testimonials[0].name}
                />
              </li>
              <li
                className={`testimonials__image-list-item ${
                  state.isActive2 ? "active" : ""
                }`}
              >
                <img
                  src={testimonials[1].image}
                  className="testimonials__image"
                  alt={testimonials[1].name}
                />
              </li>
              <li
                className={`testimonials__image-list-item ${
                  state.isActive3 ? "active" : ""
                }`}
              >
                <img
                  src={testimonials[2].image}
                  className="testimonials__image"
                  alt={testimonials[2].name}
                />
              </li>
            </ul>
          </div>
          <div className="testimonials__content">
            <ul ref={testimonialListRef} className="testimonials__content-list">
              <li
                className={`testimonials__content-list-item ${
                  state.isActive1 ? "active" : ""
                }`}
              >
                <div className="testimonials__content-inner">
                  <p className="testimonials__quote">{testimonials[0].quote}</p>
                  <h3 className="testimonials__name">{testimonials[0].name}</h3>
                  <h4 className="testimonials__title">
                    {testimonials[0].title}
                  </h4>
                </div>
              </li>
              <li
                className={`testimonials__content-list-item ${
                  state.isActive2 ? "active" : ""
                }`}
              >
                <div className="testimonials__content-inner">
                  <p className="testimonials__quote">{testimonials[1].quote}</p>
                  <h3 className="testimonials__name">{testimonials[1].name}</h3>
                  <h4 className="testimonials__title">
                    {testimonials[1].title}
                  </h4>
                </div>
              </li>
              <li
                className={`testimonials__content-list-item ${
                  state.isActive3 ? "active" : ""
                }`}
              >
                <div className="testimonials__content-inner">
                  <p className="testimonials__quote">{testimonials[2].quote}</p>
                  <h3 className="testimonials__name">{testimonials[2].name}</h3>
                  <h4 className="testimonials__title">
                    {testimonials[2].title}
                  </h4>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="arrow arrow--right" onClick={nextSlide}>
          <span>
            <img src={rightArrowImg} alt="Right arrow icon" />
          </span>
        </div>
      </div>
    </div>
  );
};
