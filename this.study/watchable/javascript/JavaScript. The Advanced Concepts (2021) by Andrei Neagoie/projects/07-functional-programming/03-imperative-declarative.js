// Imperative: We tell what to do, and how to do it.
// Declarative: We tell what to do, and what should happen. Not how to do it.

// From low level languages (machine language) to high level languages
// (JavaScript), we go from imperative to declarative.

// Imperative
for (let i = 0; i < 1000; i++) {
  console.log(i);
}

// Declarative
[1, 2, 3].forEach((item) => console.log(item));

// Functional programming helps us be more declarative by using functions and
// composing functions. We tell our programs what to do and not how to do it.
// However, note that declarative code is always going to end up compiling
// down or being processed by something imperative, like machine code. The
// idea is for us, the developers, to work in a declarative setting to be more
// productive and write better understandable and predictable code. At the end
// of the day, some other low level process can do the imperative tasks for us.
