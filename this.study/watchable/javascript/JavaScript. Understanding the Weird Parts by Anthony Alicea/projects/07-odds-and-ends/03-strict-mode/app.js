// "use strict"; // Either at the top of file or at the top of function

function logNewPerson() {
  "use strict";
  var person2;
  persom2 = {};
  console.log(persom2);
}

var person;
persom = {};

// "{}" in non-strict mode, "ReferenceError" in strict mode
console.log(persom);

logNewPerson();

// "use strict" is an opt-in feature and not every JavaScript engine
// implements "use strict" in the same way. So this is an extra thing, not
// something you can 100% rely on, but it can be useful.

// If you have several JavaScript files, and as part of your build process
// you concatenate and minify them, and if that first file has "use strict" at
// the top, then the whole thing will be processed in strict mode. Be aware of
// this, you might cause yourself trouble if other files don't follow the strict
// mode rules.
