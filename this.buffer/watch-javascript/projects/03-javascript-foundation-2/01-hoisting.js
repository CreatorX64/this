// To aviod the below scenario where hoisting makes our code unpredictable,
// avoid using "var". Instead, use "let" or "const".

var favoriteFood = "grapes";

var foodThoughts = function () {
  console.log("Original favorite food: " + favoriteFood); // undefined

  var favoriteFood = "sushi";

  console.log("New favorite food: " + favoriteFood); // sushi
};

foodThoughts();
