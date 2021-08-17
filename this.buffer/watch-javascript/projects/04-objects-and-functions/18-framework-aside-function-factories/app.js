// Factory function
function makeGreeting(language) {
  return function (firstName, lastName) {
    if (language === "en") {
      console.log("Hello " + firstName + " " + lastName);
    }

    if (language === "es") {
      console.log("Hola " + firstName + " " + lastName);
    }
  }
}

// Both of the makeGreeting calls will create different execution contexts
// with their own variable environments. So the anonymous function that's
// returned by each of them will have a different outer variable environment
// reference which contain different values of "language", even though for
// both of them the anonymous function is physically defined in the same place.
// Both of the calls will wield a different closure
var greetEnglish = makeGreeting("en");  // greetEnglish's closure points to "language" being English
var greetSpanish = makeGreeting("es");  // greetSpanish's closure points to "language" being Spanish

// When we execute each of them, the "language" will be found in each
// scope chain (or in each closure) as "en" and "es"
greetEnglish("John", "Doe");
greetSpanish("John", "Doe");

// The key thing to realize here is that every time we call a function, it gets
// its own execution context. Any function created inside of it will point to that
// execution context as its outer environment reference.

// In summary, makeGreeting is returning a function that has access to what
// the "language" variable was at the time that it was created, by pointing to
// that memory space. And this lets us create functions from other functions