let temp = 55;

// Logical && (and) operator - true if both sides are true, false otherwise.
// Logical || (or) operator - true if at least one side is true, false otherwise.

if (temp >= 60 && temp <= 90)
{
  console.log("It is pretty nice out.");
}
else if (temp <= 0 || temp >= 120)
{
  console.log("Do not go outside.");
}
else
{
  console.log("Eh. Do what you want.");
}

// Challenge.

let isGuestOneVegan = false;
let isGuestTwoVegan = false;

if (isGuestOneVegan && isGuestTwoVegan)
{
  console.log("Only offer up vegan dishes.");
}
else if (isGuestOneVegan || isGuestTwoVegan)
{
  console.log("Make sure to offer up some vegan options.");
}
else
{
  console.log("Offer up anything on the menu.");
}