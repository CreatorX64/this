function greet(firstName, lastName, language) {
// function greet(firstName, lastName, language = "") {  // Default parameters can be used, not fully supported yet
// function greet(firstName, lastName, language, ...other) {  // New JS feature: Rest syntax to capture all or remaining arguments, not fully supported yet
  // As an alternative to default parameters (which are not fully supported by browsers)
  language = language || "en";

  if (arguments.length === 0) {
    console.log("Missing parameters!");
    console.log("--------");
    return;
  }

  console.log(firstName);
  console.log(lastName);
  console.log(language);
  // The "arguments" keyword holds a value that is "array-like". This means that
  // it looks like an array, acts like an array, but isn't exactly an array only in
  // the sense that it doesn't have all the features of a JavaScript array. However,
  // it acts enough like an array that we can use it like an array in most circumstances
  console.log(arguments);
  console.log("arg 0: " + arguments[0]);
  console.log("--------");
}

// Even though we don't pass in values as arguments to the function, it prints "undefined"
// for missing values. This is due to the fact that the hoisting process that takes place
// when the execution context is created for the function invocation. Hoisting takes
// all the parameters and gives memory space to each of them to hold undefined value
greet();
greet("John");
greet("John", "Doe");
greet("John", "Doe", "tr");