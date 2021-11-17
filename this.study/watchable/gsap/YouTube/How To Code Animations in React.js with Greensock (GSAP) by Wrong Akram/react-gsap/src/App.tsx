import { useCallback, useEffect, useRef, useState } from "react";
import gsap, { Power3 } from "gsap";
import "./App.css";

export const App = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  let appRef = useRef<HTMLDivElement>(null);
  let circleYellowRef = useRef<HTMLDivElement>(null);
  let circleRedRef = useRef<HTMLDivElement>(null);
  let circleBlueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appRef.current &&
      gsap.to(appRef.current, {
        duration: 0,
        css: {
          visibility: "visible"
        }
      });

    // circleYellowRef.current &&
    //   gsap.from(circleYellowRef.current, {
    //     duration: 0.8,
    //     opacity: 0,
    //     x: 40,
    //     ease: Power3.easeOut
    //   });
    // circleRedRef.current &&
    //   gsap.from(circleRedRef.current, {
    //     duration: 0.8,
    //     opacity: 0,
    //     x: 40,
    //     ease: Power3.easeOut,
    //     delay: 0.2
    //   });
    // circleBlueRef.current &&
    //   gsap.from(circleBlueRef.current, {
    //     duration: 0.8,
    //     opacity: 0,
    //     x: 40,
    //     ease: Power3.easeOut,
    //     delay: 0.4
    //   });

    // Using stagger property instead of adding separate delays to each element.
    circleYellowRef.current &&
      circleRedRef.current &&
      circleBlueRef.current &&
      gsap.from(
        [circleYellowRef.current, circleRedRef.current, circleBlueRef.current],
        {
          duration: 0.8,
          opacity: 0,
          x: 40,
          ease: Power3.easeOut,
          stagger: 0.2
        }
      );
  }, []);

  const handleExpand = () => {
    circleRedRef.current &&
      gsap.to(circleRedRef.current, {
        duration: 0.8,
        width: 200,
        height: 200,
        ease: Power3.easeOut,
        onComplete: () => {
          setIsExpanded(true);
        }
      });
  };

  const handleShrink = () => {
    circleRedRef.current &&
      gsap.to(circleRedRef.current, {
        duration: 0.8,
        width: 75,
        height: 75,
        ease: Power3.easeOut,
        onComplete: () => {
          setIsExpanded(false);
        }
      });
  };

  const onCircleClick = useCallback(() => {
    if (isExpanded) {
      handleShrink();
    } else {
      handleExpand();
    }
  }, [isExpanded]);

  return (
    <div className="App" ref={appRef}>
      <header className="App-header">
        <div className="circle-container">
          <div ref={circleYellowRef} className="circle yellow"></div>
          <div
            ref={circleRedRef}
            className="circle red"
            onClick={onCircleClick}
          ></div>
          <div ref={circleBlueRef} className="circle blue"></div>
        </div>
      </header>
    </div>
  );
};
