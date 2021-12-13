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
