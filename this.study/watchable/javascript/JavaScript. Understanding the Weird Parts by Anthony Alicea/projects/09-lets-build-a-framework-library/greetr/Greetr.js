// ;(function (global, $) {
(function (global, $) {
  // "new" an object.
  var Greetr = function (firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  // Hidden within the scope of the IIFE and never directly accessible.
  var supportedLanguages = ["en", "es"];

  // Informal greetings
  var greetings = {
    en: "Hello",
    es: "Hola"
  };

  // Formal greetings
  var formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  // Logger messages
  var logMessages = {
    en: "Logged in",
    es: "Inició sesión"
  };

  // Prototype holds methods (to save memory space).
  Greetr.prototype = {
    // "this" refers to the calling object at execution time.
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },
    validate: function () {
      // Check that is a valid language.
      // References the externally inaccessible "supportedLanguages" within the closure.
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },
    // Retrieve messages from objects by referring to properties using [] syntax.
    greeting: function () {
      return greetings[this.language] + " " + this.firstName + "!";
    },
    formalGreeting: function () {
      return formalGreetings[this.language] + ", " + this.fullName();
    },
    // Chainable methods return their own containing object.
    greet: function (isFormal) {
      var msg;

      // If "undefined" or "null", it will be coerced to "false".
      if (isFormal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // "this" refers to the calling object at execution time, which makes
      // the method chainable.
      return this;
    },
    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      // Make chainable.
      return this;
    },
    setLanguage: function (language) {
      // Set the language.
      this.language = language;
      // Validate.
      this.validate();
      // Make chainable.
      return this;
    },
    htmlGreeting: function (selector, isFormal) {
      if (!$) {
        throw "jQuery not loaded";
      }

      if (!selector) {
        throw "Missing jQuery selector";
      }

      // Determine the message.
      var msg;
      if (isFormal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // Inject the message into the chosen place in the DOM.
      $(selector).html(msg);

      // Make chainable.
      return this;
    }
  };

  // The actual object is created here, allowing us to "new" an object without calling "new".
  Greetr.init = function (firstName, lastName, language) {
    var self = this;

    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";

    self.validate();
  };

  // Trick borrowed from jQuery so we don't have to use the "new" keyword.
  Greetr.init.prototype = Greetr.prototype;

  // Attact Greetr to the global object, provide a shorthand "$G"
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
