// Using callback for asynchronous calls.

const getDataCallback = (num, callback) =>
{
  setTimeout(() =>
  {
    if (typeof num === "number")
    {
      callback(undefined, num *2);
    }
    else
    {
      callback("Number must be provided.");
    }
  }, 2000);
};

// One problem with using callbacks: Callback hell.
// getDataCallback(2, (error, data) =>
// {
//   if (error)
//   {
//     console.log(error);
//   }
//   else
//   {
//     getDataCallback(data, (error, data) =>
//     {
//       if (error)
//       {
//         console.log("error");
//       }
//       else
//       {
//         console.log(`Callback data: ${data}`);
//       }
//     });
//   }
// });

// Using promises for asynchronous calls.

const getDataPromise = num =>
  new Promise((resolve, reject) =>
  {
    setTimeout(() =>
    {
      typeof num === "number" ? resolve(num * 2) : reject("Number must be provided");
    }, 2000);
  });

// getDataPromise(2)
//   .then(data =>
//   {
//     getDataPromise(data)
//       .then(data =>
//       {
//         console.log(`Promise data: ${data}`);
//       })
//       .catch(error =>
//       {
//         console.log(error);
//       })
//   })
//   .catch(error =>
//   {
//     console.log(error);
//   });

// One advantage of using promises: Promise chaining.
getDataPromise(10)
  .then(data =>
  {
    return getDataPromise(data);
  })
  .then(data =>
  {
    return "This is some test data.";
  })
  .then(data =>
  {
    console.log(`Promise data: ${data}`);
  })
  .catch(error =>
  {
    console.log(`Error: ${error}`);
  });