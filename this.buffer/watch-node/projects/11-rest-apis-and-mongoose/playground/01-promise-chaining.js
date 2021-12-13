function add(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
}

// Nesting promises results in something familiar, "callback hell". Also, each
// nested promise will need their own catch() block, which is a pain to manage.
// add(1, 2)
//   .then((sum) => {
//     console.log(sum);

//     add(sum, 5)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Instead we can do promise chaining
add(1, 1)
  .then((sum) => {
    console.log(sum);
    return add(sum, 4);
  })
  .then((sum) => {
    console.log(sum);
  })
  .catch((error) => {
    console.log(error);
  });
