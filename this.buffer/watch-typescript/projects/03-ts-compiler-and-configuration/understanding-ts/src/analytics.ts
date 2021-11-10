// function sendAnalytics(data) { // Error! noImplicitAny options is set to "true".
function sendAnalytics(data: string) {
  console.log(data);
}

sendAnalytics("The data");

// This is not an error for "noImplicitAny" though.
let logged;
logged = true;
logged = "Max";
console.log(logged);
