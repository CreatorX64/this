// Gets a new object. The architecture allows us to not have to use the "new" keyword here.
var g = G$("John", "Doe");

// Use our chainable methods.
// g.greet();
// g.greet().greet(true);
// g.greet().setLanguage("fr").greet(true);
// g.greet().setLanguage("es").greet(true);
// g.greet().setLanguage("es").greet(true).log();

// Use our object on the click of the login button.
$("#login-button").click(function () {
  // Create a new "Greetr" object (let's pretend we know the name from the login).
  var loginGreeter = G$("John", "Doe");

  // Hide the login on the screen.
  $("#login").hide();

  // Fire off an HTML greeting and log the welcome as well.
  loginGreeter
    .setLanguage($("#lang").val())
    .htmlGreeting("#greeting", true)
    .log();
});
