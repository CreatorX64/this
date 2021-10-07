(async function () {
  try {
    await Promise.reject("Oopsie");
    console.log("This won't print...");
  } catch (err) {
    console.log("Got it", err);
  }
  console.log("Is this still good?");
})();
