"use strict";

(() => {
  const updateList = () => {
    // Titles denote the start point of our webpage sections.
    const titles = [...document.querySelectorAll("h1, h2")];
    // Sort titles from top to bottom relative to the viewport.
    const sortedTitles = [...titles].sort((a, b) => {
      return (
        Math.abs(a.getBoundingClientRect().top) -
        Math.abs(b.getBoundingClientRect().top)
      );
    });
    // There's one nav dot corresponding to each section/title.
    const navDots = document.querySelectorAll(".nav-dot");
    const selectedCircles = document.querySelectorAll(".selected-circle");

    selectedCircles.forEach((c) => c.classList.remove("selected-circle"));
    navDots[titles.indexOf(sortedTitles[0])].classList.add("selected-circle");
  };

  updateList();

  window.addEventListener("scroll", () => {
    updateList();
  });
})();
