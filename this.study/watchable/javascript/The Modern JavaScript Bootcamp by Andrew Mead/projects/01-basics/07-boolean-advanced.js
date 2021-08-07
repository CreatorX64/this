let isAccountLocked = false;
let userRole = "user";

if (isAccountLocked)
{
  console.log("Account is locked.");
}
else if (userRole === "admin")
{
  console.log("Welcome Admin!");
}
else
{
  console.log("Welcome!");
}

// Challenge.

let temp = 4;

if (temp <= 32)
{
  console.log("It is freezing outside!");
}
else if (temp >= 110)
{
  console.log("It is hot outside!");
}
else
{
  console.log("Go for it. It is pretty nice.");
}