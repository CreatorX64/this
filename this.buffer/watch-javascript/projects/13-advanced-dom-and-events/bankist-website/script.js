"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const sectionOne = document.querySelector("#section--1");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const sliderElem = document.querySelector(".slider");
const dotContainer = document.querySelector(".dots");

//-- Modal window

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

function openModal(event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

//-- Page navigation (smooth scrolling)

document.querySelector(".nav__links").addEventListener("click", (event) => {
  if (
    event.target.hasAttribute("href") &&
    event.target.className === "nav__link"
  ) {
    event.preventDefault();
    const id = event.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//-- Tabbed component

tabsContainer.addEventListener("click", (event) => {
  const clicked = event.target.closest(".operations__tab");

  // Guard clause (the user clicked outside of any buttons)
  if (!clicked) {
    return;
  }

  // Activate tab
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // Activate content area
  tabsContent.forEach((tab) => {
    tab.classList.remove("operations__content--active");
  });
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//-- Nav manu fade animation: We use two methods to pass in arguments into the
// event handler function: Using bind(), using an intermediary arrow function.

// We could use "mouseenter" event, but it doesn't bubble.
nav.addEventListener("mouseover", handleHover.bind(nav, 0.5));

// We could use "mouseleave" event, but it doesn't bubble.
nav.addEventListener("mouseout", (event) => {
  handleHover(1, event);
});

function handleHover(opacity, event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const logo = link.closest(".nav").querySelector("img");
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    logo.style.opacity = opacity;
    siblings.forEach((sibling) => {
      if (sibling !== link) {
        sibling.style.opacity = opacity;
      }
    });
  }
}

//-- Sticky navigation

const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(headerObserverCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

function headerObserverCallback(entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.remove("sticky");
  } else {
    nav.classList.add("sticky");
  }
}

//-- Reveal sections

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15 // 15%
// });

// allSections.forEach((section) => {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });

// function revealSection(entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove("section--hidden");
//   observer.unobserve(entry.target);
// }

//-- Lazy loading images

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
});

imgTargets.forEach((img) => imgObserver.observe(img));

function loadImg(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
}

//-- Slider

slider();

function slider() {
  let currSlide = 0;
  const maxSlide = slides.length - 1; // 0 based

  initSlider();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    }
  });
  dotContainer.addEventListener("click", (event) => {
    if (!event.target.classList.contains("dots__dot")) return;

    currSlide = event.target.dataset.slide;
    goToSlide(currSlide);
    activateDot(currSlide);
  });

  function initSlider() {
    goToSlide(0);
    createDots();
    activateDot(0);
  }

  function nextSlide() {
    if (currSlide === maxSlide) {
      currSlide = 0;
    } else {
      ++currSlide;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  }

  function prevSlide() {
    if (currSlide === 0) {
      currSlide = maxSlide;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  }

  function goToSlide(slideNum) {
    slides.forEach((s, idx) => {
      s.style.transform = `translateX(${(idx - slideNum) * 100}%)`;
    });
  }

  function createDots() {
    slides.forEach((_, idx) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${idx}"></button>`
      );
    });
  }

  function activateDot(slideNum) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${slideNum}"]`)
      .classList.add("dots__dot--active");
  }
}
