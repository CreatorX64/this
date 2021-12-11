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
