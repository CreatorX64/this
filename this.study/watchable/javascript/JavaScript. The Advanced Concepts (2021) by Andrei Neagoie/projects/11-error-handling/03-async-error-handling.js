// Error handling in promises

Promise.resolve("asyncfail")
  .then((res) => {
    // throw new Error("#1 fail");
    // return res;

    // If we have a nested Promise, then we need to have a separate catch block for it.
    Promise.resolve()
      .then(() => {
        throw new Error("#3 fail");
      })
      .catch(console.log);
    return 5;
  })
  .then((res) => {
    console.log(res);
  })
  // .catch((err) => {
  //   // console.log("Got it", err);
  //   // return err;
  //   throw new Error("#2");
  // })
  // .then((res) => {
  //   console.log(res.message);
  // })
  .catch((err) => {
    console.log("Final error", err);
  });
