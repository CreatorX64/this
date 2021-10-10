// Set current year.

const yearElem = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearElem.textContent = currentYear;

// Make mobile navigation work.

const navButtonElem = document.querySelector(".btn-mobile");
const headerElem = document.querySelector(".header");

navButtonElem.addEventListener("click", () => {
  headerElem.classList.toggle("header--nav-open");
});

// Smooth scrolling animation.

const allLinkElems = document.querySelectorAll("a:link");

allLinkElems.forEach((linkElem) => {
  linkElem.addEventListener("click", (event) => {
    event.preventDefault();

    const href = linkElem.getAttribute("href");

    if (href === "#") {
      // Scroll back to top.
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("#")) {
      // Scroll to other sections.
      const targetElem = document.querySelector(href);
      targetElem.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile nav after scroll.
    if (linkElem.classList.contains("nav__link")) {
      headerElem.classList.remove("header--nav-open");
    }
  });
});

// Sticky navigation.

const sectionHeroElem = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  (entries) => {
    const observerEntry = entries[0];
    // The hero section os out of the viewport.
    if (!observerEntry.isIntersecting) {
      document.body.classList.add("sticky-nav");
    } else {
      // The hero section is in the viewport.
      document.body.classList.remove("sticky-nav");
    }
  },
  {
    // Observe the hero section in the viewport, not in another element.
    root: null,
    // Run the callback as soon as even 1px of the hero is visible. The
    // callback is ran if the threshold is passed in one way or the another,
    // so it will also run when the hero section is completely out of view.
    threshold: 0,
    rootMargin: "-80px"
  }
);

observer.observe(sectionHeroElem);

// Fix flexbox gap property missing in some Safari versions.

(function () {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) {
    document.body.classList.add("no-flexbox-gap");
  }
})();
