import { gsap, Power3 } from "gsap";
import { useLayoutEffect, useState, useRef } from "react";
import "./styles.scss";
import { Movie } from "../../seed";

interface MovieCardProps {
  movies: Movie[];
}

const tl = gsap.timeline();

export const MovieCard = ({ movies }: MovieCardProps): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.to(imageRef.current, {
      duration: 0,
      scale: 1.7,
      y: 14
    });
    gsap.to(cardRef.current, {
      duration: 0,
      background: movies[index].backgroundColor
    });
  }, [index, movies]);

  const handleClick = (direction: "left" | "right") => {
    setIsAnimating(true);

    let newIndex: number = 0;

    if (direction === "left") {
      newIndex = index - 1;
      if (newIndex < 0) {
        newIndex = 2;
      }
    } else if (direction === "right") {
      newIndex = index + 1;
      if (newIndex > 2) {
        newIndex = 0;
      }
    }

    tl.to(imageRef.current, {
      duration: 0.8,
      scale: 1.7,
      opacity: 0,
      ease: Power3.easeOut,
      onComplete() {
        setIndex(() => newIndex);
      }
    })
      .to(
        contentRef.current,
        {
          duration: 0.8,
          y: 10,
          opacity: 0,
          ease: Power3.easeOut
        },
        "-=0.8"
      )
      .to(
        cardRef.current,
        {
          duration: 1,
          ease: Power3.easeOut,
          background: movies[newIndex].backgroundColor
        },
        "-=0.8"
      )
      .to(imageRef.current, {
        duration: 0.8,
        scale: 1.7,
        y: 14,
        opacity: 1,
        ease: Power3.easeOut
      })
      .to(
        contentRef.current,
        {
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: Power3.easeOut,
          onComplete() {
            setIsAnimating(false);
          }
        },
        "-=0.8"
      );
  };

  return (
    <div className="container">
      <svg
        onClick={!isAnimating ? () => handleClick("left") : () => {}}
        xmlns="http://www.w3.org/2000/svg"
        className="arrow arrow--left"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <svg
        onClick={!isAnimating ? () => handleClick("right") : () => {}}
        xmlns="http://www.w3.org/2000/svg"
        className="arrow arrow--right"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
      <div ref={cardRef} className="card">
        <div className="card__image-box">
          <img
            ref={imageRef}
            className="card__image"
            src={movies[index].imgSrc}
            alt="TRON movie poster"
          />
        </div>
        <div ref={contentRef} className="card__content">
          <div className="card__info">
            <div className="card__genre">{movies[index].genre}</div>
            <div className="card__rating-box">
              <svg
                className="card__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16.5"
                height="15.321"
                viewBox="0 0 16.5 15.321"
              >
                <path
                  id="Icon_ionic-ios-star"
                  data-name="Icon ionic-ios-star"
                  d="M18.124,8.679H12.706L11.06,3.765a.6.6,0,0,0-1.12,0L8.294,8.679H2.839a.591.591,0,0,0-.589.589.433.433,0,0,0,.011.1.566.566,0,0,0,.247.416l4.453,3.138L5.252,17.89a.591.591,0,0,0,.2.663.57.57,0,0,0,.331.144.722.722,0,0,0,.368-.133l4.346-3.1,4.346,3.1a.69.69,0,0,0,.368.133.529.529,0,0,0,.328-.144.584.584,0,0,0,.2-.663l-1.709-4.968,4.416-3.167.107-.092a.563.563,0,0,0-.435-.983Z"
                  transform="translate(-2.25 -3.375)"
                  fill="#ccb833"
                />
              </svg>
              <span className="card__rating">
                {movies[index].rating}
                <span className="faded"> / 10</span>
              </span>
            </div>
          </div>
          <h1 className="card__title">{movies[index].title}</h1>
          <p className="card__description">{movies[index].description}</p>
          <div className="card__actions">
            <button className="card__button">Stream Now</button>
            <a href="#!" className="card__link">
              Reviews ({movies[index].reviewCount})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
