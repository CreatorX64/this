function fail() {
  // try-catch is used to catch synchronous errors AND async-await errors.
  try {
    console.log("This works!");
    throw new Error("I did something wrong");
    console.log("This will never happen...");
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
  } finally {
    console.log("Still runs");
    return "Returning fail";
  }

  console.log("!!! Never runs...");
}

fail();
