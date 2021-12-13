"use strict";

/*
//-- Selecting elements

// Get a reference to the root <html> element. Note that only referencing
// "document" does not give us access to the root DOM node.
console.log(document.documentElement);

// Get a reference to the head and body nodes.
console.log(document.head);
console.log(document.body);

// querySelector() & querySelectorAll(): This'll be your go-to choice 99% of the time.
const header = document.querySelector(".header"); // Element
const allSections = document.querySelectorAll(".section");
console.log(allSections); // NodeList (no live updates)

// getElementById()
document.getElementById("section--1"); // HTMLElement

// getElementsByTagName()
const allButtons = document.getElementsByTagName("button");
console.log(allButtons); // HTMLCollection (live updates)

// getElementsByClassName()
console.log(document.getElementsByClassName("btn")); // HTMLCollection (live updates)

//-- Creating elements

// elem.insertAdjacentHTML(): See the bankist application for the usage.

// document.createElement()
const message = document.createElement("div");

message.classList.add("cookie-message");
// message.textContent =
//   "We use cookies for improved functionality and analytics.";
message.innerHTML = `
  We use cookies for improved functionality and analytics.
  <button class="btn btn--close-cookie">
    Got it!
  </button>
`;

//-- Inserting elements

// header.prepend(message);

// Calling append() moves the "message" node from the prepended position to the
// appended position. Because this is a live reference to a DOM node, it cannot
// exist in two places. This comment is only concerned with the case where the
// prepend() method is not commented out.
// header.append(message);

// If we actually wanted to clone the element, we can use cloneNode().
// header.append(message.cloneNode(true)); // true to clone all child nodes as well

// Add the message node as a sibling to header, before & after it.
header.before(message);
// header.after(message);

//-- Delete elements

document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  // Old way of doing it
  // message.parentElement.removeChild(message);

  // New way of doing it
  message.remove();
});

//-- Styles

// These are set as inline styles in the HTML
message.style.backgroundColor = "#37383d";

// We can only read the styles that are set in our stylesheets or in our JS code,
// but we cannot read computed style values through the "style" property.
console.log(message.style.height);
console.log(message.style.backgroundColor);

// To get the computed styles, we can use getComputedStyle() function.
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); // We never set this, it is the computed value.

message.style.height = `${
  Number.parseFloat(getComputedStyle(message).height, 10) + 30
}px`;

// Setting CSS custom properties on :root (i.e. variables)
document.documentElement.style.setProperty("--color-primary", "orangered");

// Reading attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src); // Absolute value resolved from the value in HTML
console.log(logo.getAttribute("src")); // Value in HTML as is
console.log(logo.className);
// Reading a custom attribute
console.log(logo.getAttribute("designer"));

// Setting attributes
logo.alt = "Beautiful minimalist logo";
logo.setAttribute("company", "Bankist");

const link = document.querySelector(".twitter-link");
console.log(link.href); // Absolute value resolved from the value in HTML
console.log(link.getAttribute("href")); // Value in HTML as is

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");
// Don't do it like this
logo.className = "jonas";
*/

/*
//-- Types of events and event handlers

const h1 = document.querySelector("h1");

function alertH1() {
  console.log("addEventListeneer: You're reading the heading");
  // h1.removeEventListener("mouseenter", alertH1);
}

// Modern way of adding events. It's better because it allows us to add multiple
// handlers, remove them on by one, etc.
h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// This is old way of doing it, can only add one handler to an event.
// h1.onmouseenter = (event) => {
//   console.log("onmouseenter: You're reading the heading");
// };
*/

/*
//-- Smooth scrolling

const btnScrollTo = document.querySelector(".btn--scroll-to");
const sectionOne = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", (event) => {
  // getBoundingClientRect returns an object containing information about where
  // the element is located **relative to the viewport** (x & y pos, width & height,
  // etc.).
  // const targetOneCoords = sectionOne.getBoundingClientRect();

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
*/

/*
//-- Event propagation

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}

document
  .querySelector(".nav__link")
  // By default, addEventListener listens for events at the bubbling phase because
  // it is the most useful option (e.g. in event delegation)
  .addEventListener("click", function (event) {
    // "this" refers to the element that we called the "addEventListener" on
    this.style.backgroundColor = randomColor();
    // "event.target" refers to the target of the event that is reached after the
    // event capturing phase (there are three phases: capturing phase, target phase,
    // bubbling phase). "event.target" will be the same element in the below
    // handlers as well, because event target (the link that we click) is the
    // same in all cases as well as the "event" object which is merely passed
    // from one handler to another during capturing and bubbling phases.
    console.log("Link", event.target);
    // In contrast, the "event.currentTarget" is the element which the event handler is attached.
    console.log(event.currentTarget);
    console.log(event.currentTarget === this); // true
    // We can stop the event from propagating in the bubbling phase
    // event.stopPropagation();
  });

document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    this.style.backgroundColor = randomColor();
    console.log("Container", event.target);
    console.log(event.currentTarget);
    console.log(event.currentTarget === this); // true
  });

document.querySelector(".nav").addEventListener("click", function (event) {
  this.style.backgroundColor = randomColor();
  console.log("Nav", event.target);
  console.log(event.currentTarget);
  console.log(event.currentTarget === this); // true
});

// Listen for events in capturing phase, so this handler will be the first one
// to run because it is at the top element
// document.querySelector(".nav").addEventListener(
//   "click",
//   function (event) {
//     this.style.backgroundColor = randomColor();
//     console.log("Nav", event.target);
//     console.log(event.currentTarget);
//     console.log(event.currentTarget === this); // true
//   },
//   true
// );
*/

/*
//-- Page navigation

// Exact same function is attached to each link, which is memory-inefficient.
// What if we had 1000 elements to add the listener? Better option is to use
// event delegation. See "script.js" > "Page navigation" part
document.querySelectorAll(".nav__link").forEach((elem) => {
  elem.addEventListener("click", function (event) {
    event.preventDefault();
    // const id = this.href; // We don't need the absolute URL
    const id = this.getAttribute("href"); // We need the URL as written in HTML
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});
*/

/*
//-- DOM Traversing

const h1 = document.querySelector("h1");

// Going downwards: child
console.log(h1.querySelectorAll(".highlight")); // NodeList
console.log(h1.childNodes); // NodeList: All child nodes including text, comments, etc.
console.log(h1.children); // HTMLCollection: Only direct children that are actual elements
console.log(h1.firstElementChild); // First direct child that's an element
console.log(h1.lastElementChild); // Last direct child that's an element

// Going upwards: parents
console.log(h1.parentNode); // Direct parent node, can be anything
console.log(h1.parentElement); // Direct parent element
console.log(h1.closest(".header")); // Closest parent element with the matching selector
console.log(h1.closest("h1")); // The same element

// Going sideways: siblings
console.log(h1.previousElementSibling); // Previous direct sibling element
console.log(h1.nextElementSibling); // Next direct sibling element
console.log(h1.previousSibling); // Previous direct sibling node
console.log(h1.nextSibling); // Next direct sibling node
console.log(h1.parentElement.children); // All direct sibling elements
*/

/*
//-- Sticky navigation: Old method. This way of doing it is pretty inefficient!
// See "script.js" > "Sticky navigation" for the modern method.

const initialCoords = sectionOne.getBoundingClientRect();

window.addEventListener("scroll", (event) => {
  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
*/

/*
//-- The IntersectionObserver API

const observerOptions = {
  // "root" is the element with which we want to observe our "target"
  // intersect. If null, root is the viewport.
  root: null,
  // "threshold" is the percentage of intersection at which the observer
  // callback will be called.
  threshold: [0, 0.2],
  // A box of margin that's applied outside of the target element which is
  // the boundry that triggers intersection
  rootMargin: "-90px" // Can be px or %
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// We pass in the target element as an argument.
observer.observe(sectionOne);

// This callback function will get called each time that the observed element
// (target) intersects with the root element at the threshold that we defined.
//   - entries: We can have multiple thresholds as an array in the
//     configuration above, so the entries is an array of thresholds.
//   - observer: The observer object itself.
function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
}
*/
