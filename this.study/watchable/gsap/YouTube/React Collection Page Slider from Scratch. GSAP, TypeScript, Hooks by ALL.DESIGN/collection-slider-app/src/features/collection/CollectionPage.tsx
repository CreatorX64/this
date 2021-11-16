import { useEffect, useState, useRef, useCallback } from "react";
import { gsap, Expo } from "gsap";
import { data, DataModel } from "../../data";
import {
  ACTIVE_ZINDEX,
  DEFAULT_INDEX,
  INACTIVE_TRANSALTE,
  POLYGON_ACTIVE,
  POLYGON_INACTIVE
} from "./constants";

export const CollectionPage = (): JSX.Element => {
  // State
  const [list, setList] = useState<DataModel[]>([]);
  const [length, setLength] = useState<number>(0);
  const [activeColorIndex, setActiveColorIndex] =
    useState<number>(DEFAULT_INDEX);
  const [activeIndex, setActiveIndex] = useState<number>(DEFAULT_INDEX);
  const [activeTextIndex, setActiveTextIndex] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  // Refs
  const collectionContainer = useRef<HTMLDivElement>(null);
  const bgListContainer = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const bookTextRef = useRef<HTMLDivElement>(null);

  // Timelines
  const tl = gsap.timeline();
  const tl2 = gsap.timeline();

  const selectedColor = () => list[activeColorIndex]?.color;

  const selectedText = () => (
    <div className="book-text" ref={bookTextRef}>
      <h2>{list[activeTextIndex]?.name}</h2>
      <p>{list[activeTextIndex]?.desc}</p>
    </div>
  );

  const animateText = (isPrev: boolean = false, final: boolean = false) => {
    gsap.to(bookTextRef.current, {
      y: 15,
      ease: Expo.easeInOut,
      autoAlpha: 0,
      duration: 0.7,
      onComplete: () => {
        if (isPrev) {
          setActiveTextIndex(
            final ? length - 1 : (activeTextIndex - 1) % length
          );
        } else {
          setActiveTextIndex((activeTextIndex + 1) % length);
        }

        gsap.to(bookTextRef.current, {
          duration: 0.7,
          autoAlpha: 1,
          y: 0,
          ease: Expo.easeOut
        });
      }
    });
  };

  const listExists = (): boolean | null => {
    return (
      (bgListContainer.current &&
        bgListContainer.current.children &&
        bgListContainer?.current?.children.length > 0) ||
      (collectionContainer.current &&
        collectionContainer.current.children &&
        collectionContainer.current.children.length > 0)
    );
  };

  const getActiveBgElem = () => {
    let activeElemObj = {} as {
      activeBgElem: HTMLElement;
      activeBgElemIndex: number;
    };

    bgElemList()?.forEach((elem, index) => {
      if (elem && elem.classList && elem.classList.contains("active")) {
        activeElemObj = {
          ...activeElemObj,
          activeBgElem: elem,
          activeBgElemIndex: index
        };
      }
    });

    return activeElemObj;
  };

  const getActiveCollElem = () => {
    let activeCollElemObj = {} as {
      activeCollElem: HTMLElement;
      activeCollElemIndex: number;
    };

    collElemList()?.forEach((elem, index) => {
      if (elem && elem.classList && elem.classList.contains("active")) {
        activeCollElemObj = {
          ...activeCollElemObj,
          activeCollElem: elem,
          activeCollElemIndex: index
        };
      }
    });

    return activeCollElemObj;
  };

  const prev = (): void => {
    setDisabled(true);

    const { activeBgElem, activeBgElemIndex } = getActiveBgElem();
    const { activeCollElem, activeCollElemIndex } = getActiveCollElem();

    let prevBgElemSibling = bgElemList()![activeBgElemIndex - 1];
    let prevCollElemSibling = collElemList()![activeCollElemIndex - 1];

    activeBgElem.style.zIndex = ACTIVE_ZINDEX;
    activeCollElem.style.zIndex = ACTIVE_ZINDEX;

    if (activeBgElemIndex <= 0 || activeCollElemIndex <= 0) {
      animateText(true, true);
      setActiveColorIndex(length - 1);
      prevBgElemSibling = bgElemList()![length - 1];
      prevCollElemSibling = collElemList()![length - 1];
      animateElem(prevBgElemSibling, activeBgElemIndex, true, true);
      animateElem(prevCollElemSibling, activeCollElemIndex, true, true, true);
    } else {
      animateText(true);
      setActiveColorIndex((activeColorIndex - 1) % length);
      animateElem(prevBgElemSibling, activeBgElemIndex, false, true);
      animateElem(prevCollElemSibling, activeCollElemIndex, false, true, true);
    }
  };

  const next = (): void => {
    setDisabled(true);
    setActiveColorIndex((activeColorIndex + 1) % length);
    animateText();

    const { activeBgElem, activeBgElemIndex } = getActiveBgElem();
    const { activeCollElem, activeCollElemIndex } = getActiveCollElem();

    let nextBgElemSibling = bgElemList()![activeBgElemIndex + 1];
    let nextCollElemSibling = collElemList()![activeCollElemIndex + 1];

    activeBgElem.style.zIndex = ACTIVE_ZINDEX;
    activeCollElem.style.zIndex = ACTIVE_ZINDEX;

    if (activeBgElemIndex + 1 >= length || activeCollElemIndex + 1 >= length) {
      nextBgElemSibling = bgElemList()![0];
      nextCollElemSibling = collElemList()![0];

      animateElem(nextBgElemSibling, activeBgElemIndex, true, false);
      animateElem(nextCollElemSibling, activeCollElemIndex, true, false, true);
    } else {
      animateElem(nextBgElemSibling, activeBgElemIndex, false, false);
      animateElem(nextCollElemSibling, activeCollElemIndex, false, false, true);
    }
  };

  /**
   *
   * @param elem HTML element to animate
   * @param index Active element index
   * @param final Indicator when index has reacted the end or beginning
   * @param isPrev Indicator when using inside prev method
   * @param isColl true if we're animating collection array
   */
  const animateElem = (
    elem: HTMLElement,
    index: number,
    final: boolean = false,
    isPrev: boolean = false,
    isColl: boolean = false
  ): void => {
    if (isColl) {
      elem.style.clipPath = POLYGON_ACTIVE;

      tl2
        .to(elem, {
          duration: 0,
          autoAlpha: 1,
          zIndex: isPrev
            ? final
              ? ACTIVE_ZINDEX
              : ACTIVE_ZINDEX + 1
            : final
            ? ACTIVE_ZINDEX + 1
            : ACTIVE_ZINDEX
        })
        .to(elem, {
          translateY: 0,
          scale: 1,
          ease: Expo.easeInOut,
          duration: 1.4,
          onComplete: () => {
            if (isPrev) {
              switchActiveElem(index, length - 1, true);
            } else {
              switchActiveElem(index);
            }
          }
        });
    } else {
      tl.to(elem, {
        duration: 0,
        autoAlpha: 1,
        zIndex: isPrev
          ? final
            ? ACTIVE_ZINDEX
            : ACTIVE_ZINDEX + 1
          : final
          ? ACTIVE_ZINDEX + 1
          : ACTIVE_ZINDEX
      }).to(elem, {
        ease: Expo.easeInOut,
        duration: 1.4,
        translateX: 0,
        onComplete: () => {
          if (isPrev) {
            switchActiveElem(index, length - 1, true);
          } else {
            switchActiveElem(index);
          }
        }
      });
    }
  };

  const switchActiveElem = (
    index: number,
    length: number = bgElemList()!.length - 1,
    isPrev: boolean = false
  ): void => {
    if (isPrev) {
      if (index <= 0) {
        bgElemList()![length].classList.add("active");
        collElemList()![length].classList.add("active");
        setActiveIndex(length);
        setDisabled(false);
      } else {
        bgElemList()![index - 1].classList.add("active");
        collElemList()![index - 1].classList.add("active");
        setActiveIndex((activeIndex - 1) % length);
        setDisabled(false);
      }
    } else {
      if (index >= length) {
        bgElemList()![0].classList.add("active");
        collElemList()![0].classList.add("active");
        setActiveIndex(0);
        setDisabled(false);
      } else {
        bgElemList()![index + 1].classList.add("active");
        collElemList()![index + 1].classList.add("active");
        setActiveIndex((activeIndex + 1) % length);
        setDisabled(false);
      }
    }

    gsap.to(bgElemList()![index], {
      duration: 0,
      zIndex: -1,
      autoAlpha: 0,
      translateX: INACTIVE_TRANSALTE
    });

    gsap.to(collElemList()![index], {
      duration: 0,
      zIndex: -1,
      autoAlpha: 0,
      clipPath: POLYGON_INACTIVE,
      translateY: INACTIVE_TRANSALTE
    });

    bgElemList()![index].classList.remove("active");
    collElemList()![index].classList.remove("active");
  };

  const bgElemList = useCallback((): HTMLElement[] | null => {
    if (listExists()) {
      return Array.prototype.slice.call(bgListContainer.current?.children);
    }
    return null;
  }, []);

  const collElemList = useCallback((): HTMLElement[] | null => {
    if (listExists()) {
      return Array.prototype.slice.call(collectionContainer.current?.children);
    }
    return null;
  }, []);

  const renderBgList = (): JSX.Element[] =>
    list.map((item) => (
      <figure key={item.id} className="background-img" ref={bgImageRef}>
        <img src={item.url} alt={`Gallery item by ${item.name}`} />
      </figure>
    ));

  const renderCollList = (): JSX.Element[] =>
    list.map((item) => (
      <figure key={item.id} className="img">
        <img src={item.url} alt={`Gallery item by ${item.name}`} />
      </figure>
    ));

  const initElements = useCallback(() => {
    if (listExists()) {
      const elemList = bgElemList();
      const collList = collElemList();

      if (elemList) {
        elemList[DEFAULT_INDEX].classList.add("active");
        elemList[DEFAULT_INDEX].style.zIndex = ACTIVE_ZINDEX;

        for (let i = DEFAULT_INDEX + 1; i < length; i++) {
          gsap.to(elemList[i], {
            duration: 0,
            zIndex: -1,
            autoAlpha: 0,
            translateX: INACTIVE_TRANSALTE
          });
        }
      }

      if (collList) {
        collList[DEFAULT_INDEX].classList.add("active");
        collList[DEFAULT_INDEX].style.zIndex = ACTIVE_ZINDEX;

        for (let i = DEFAULT_INDEX + 1; i < length; i++) {
          gsap.to(collList[i], {
            duration: 0,
            zIndex: -1,
            scale: 1.4,
            clipPath: POLYGON_INACTIVE,
            autoAlpha: 0,
            translateY: INACTIVE_TRANSALTE
          });
        }
      }
    }
  }, [length, collElemList, bgElemList]);

  useEffect(() => {
    setList(data);
    setLength(data.length);
    initElements();
  }, [list, length, initElements]);

  return (
    <div className="collection">
      <div
        className="collection__left"
        style={{
          backgroundColor: selectedColor() && selectedColor()
        }}
      >
        <div className="collection-actions">
          <button className="btn btn--prev" disabled={disabled} onClick={prev}>
            Previous Collection
          </button>
          <button className="btn btn--next" disabled={disabled} onClick={next}>
            Next Collection
          </button>
        </div>
        <div className="book-wrapper" ref={collectionContainer}>
          {renderCollList()}
        </div>
        {selectedText()}
      </div>
      <div className="collection__right">
        <div className="wrapper" ref={bgListContainer}>
          {renderBgList()}
        </div>
        <div className="main-title">
          <h1 className="title">Collection</h1>
          <a href="/" className="link">
            See the full list
          </a>
        </div>
      </div>
    </div>
  );
};
