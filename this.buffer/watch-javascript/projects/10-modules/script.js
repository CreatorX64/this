//-- IIFE module pattern

// We can import things through the function paramters and pass them through the
// argument list at the bottom when calling the IIFE.
const fightModule = (function () {
  // Private variables
  const harry = "potter";
  const voldemort = "He who must not be named";

  function fight(char1, char2) {
    const attack1 = Math.floor(Math.random() * char1.length);
    const attack2 = Math.floor(Math.random() * char2.length);
    return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
  }

  return { fight };
})();

//-- CommonJS: Created mainly for server with Node.js in mind. Modules are meant
// to be loaded synchronously. This is not ideal for browsers as there're lots of
// user interactions. That's why a tool called "browserify" was created which
// lets developers use require("modules") in the browser by bundling up all of
// their dependencies.

const module1 = require("module1"); // .fight
const importedFunc = require("module2").importedFunc;

function anotherFight() {
  console.log("Let's export this function");
}

module.exports = { fight: anotherFight };

//-- AMD (Asynchronous Module Definition): Doesn't look as clean as CommonJS, and
// in contrast, AMD was designed for the browser. It loads scripts asynchronously.
// The main way that people used AMD modules was through the usage of a library
// called "RequireJS".

define(["module1", "module2"], function (module1Import, module2Import) {
  const module1 = module1Import;
  const module2 = module2Import;

  function dance() {
    console.log("Let's dance!");
  }

  return { dance };
});

//-- UMD: Simply just an if-else statement to identify the module system
// (CommonJS or AMD) that the current environment supports and then load the
// CommonJS or AMD version of the code.

//-- ES6 Modules: The <script> tag(s) that you want to import/export to/from
// must have the following property and value: type="module". In addition,
// the html file that includes these scripts must be served from a server.

import module1 from "module1";
import { fight } from "module2";

const harry = "potter";
const voldemort = "He who must not be named";

function jump() {
  console.log("Jumping!");
}

export function fight(char1, char2) {
  const attack1 = Math.floor(Math.random() * char1.length);
  const attack2 = Math.floor(Math.random() * char2.length);
  return attack1 > attack2 ? `${char1} wins` : `${char2} wins`;
}
