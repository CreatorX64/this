"use strict";

// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

// Smooth scrolling

const btnScrollTo = document.querySelector(".btn--scroll-to");
const sectionOne = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", (event) => {
  // getBoundingClientRect returns an object containing information about where
  // the element is located **relative to the viewport** (x & y pos, width & height,
  // etc.).
  const targetOneCoords = sectionOne.getBoundingClientRect();

  // console.log(targetOneCoords);
  // console.log(event.target.getBoundingClientRect());

  // How much the page is scrolled in X and Y axis
  // console.log("Current scroll (x/y):", window.scrollX, window.scrollY);

  // Get the width & height of the viewport (i.e. the root element)
  // console.log(
  //   "Width & height of window minus scrollbar and borders:",
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight
  // );
  // console.log(
  //   "Width & height of window plus scrollbar and borders:",
  //   window.innerWidth,
  //   window.innerHeight
  // );

  // Scrolling

  // This doesn't work when we click the button with a slightly scrolled
  // viewport, because .top property is relative to the viewport and not the
  // document. To make it relative to the document, we need to add the current
  // scrolled amount to the .top property's value.
  // window.scrollTo(targetOneCoords.left, targetOneCoords.top);

  // This works:
  // window.scrollTo(
  //   targetOneCoords.left + window.scrollX,
  //   targetOneCoords.top + window.scrollY
  // );

  // But we can even make it better (smooth scrolling):
  // window.scrollTo({
  //   left: targetOneCoords.left + window.scrollX,
  //   top: targetOneCoords.top + window.scrollY,
  //   behavior: "smooth"
  // });

  // Aaaand here is the modern way to do the same thing:
  sectionOne.scrollIntoView({ behavior: "smooth" });
});
