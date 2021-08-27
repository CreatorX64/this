// This is sort of a workaround for what you'll see as "function overloading"
// in other languages. However, functions in JS have their own strengths as
// they are "first class functions". In JS frameworks and libraries, you'll
// see the pattern below on occasion to make it easier to use the framework/library

function greet(firstName, lastName, language) {
  language = language || "en";

  if (language === "en") {
    console.log("Hello " + firstName + " " + lastName);
  }

  if (language === "es") {
    console.log("Hola " + firstName + " " + lastName);
  }
}

function greetEnglish(firstName, lastName) {
  greet(firstName, lastName, "en");
}

function greetSpanish(firstName, lastName) {
  greet(firstName, lastName, "es");
}

greet("John", "Doe", "en");
greet("John", "Doe", "es");
greetEnglish("John", "Doe");
greetSpanish("John", "Doe");