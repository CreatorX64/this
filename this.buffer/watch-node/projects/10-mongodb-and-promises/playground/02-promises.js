//
//                          fulfilled
//                        /
// Promise -- pending -->
//                        \
//                          rejected
//

const doWorkPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve([7, 4, 1]);
      reject("This is my error!");

      // These have no effect! Once a Promise is resolved or rejected, subsequent
      // calls to these functions are ignored. This is something we don't have
      // with the callback pattern where it is easy to mess things up.
      // resolve([2, 3, 2]);
      // reject("New error!");
    }, 2000);
  });
};

doWorkPromise()
  .then((result) => {
    console.log("Success!", result);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
