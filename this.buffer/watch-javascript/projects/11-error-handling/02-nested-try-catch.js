try {
  try {
    something();
  } catch (err) {
    throw new Error(err);
  }
} catch (err) {
  console.log("Got it", err);
}
