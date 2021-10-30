function doWorkCallback(callback) {
  setTimeout(() => {
    // callback("This is my error!", null);
    callback(null, [1, 4, 7]);
  }, 2000);
}

doWorkCallback((error, result) => {
  if (error) {
    return console.log("Error!", error);
  }
  console.log("Success!", result);
});
