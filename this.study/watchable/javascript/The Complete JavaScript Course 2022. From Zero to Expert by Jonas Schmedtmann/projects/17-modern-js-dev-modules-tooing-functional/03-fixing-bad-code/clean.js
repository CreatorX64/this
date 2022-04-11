"use strict";

// Object.freeze() is not a deep-freeze, it only prevents mutation of top-level
// properties. E.g., it's possible to do budget[0].value = 1000 below but it's
// not possible to do budget[0] = "something". Note that theere're 3rd party
// libraries that achieve deep-freeze
const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "mel" },
  { value: -125, description: "Toys 🚂", user: "mel" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" }
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  mel: 100
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function
const addExpense = (state, limits, value, description, user = "jonas") => {
  const normalizedUser = user.trim().toLowerCase();

  return value <= getLimit(limits, normalizedUser)
    ? [
        ...state,
        {
          value: -value,
          description,
          user: normalizedUser
        }
      ]
    : state;
};

const checkExpenses = (state, limits) =>
  state.map((entry) =>
    entry.value < -getLimit(limits, entry.user)
      ? {
          ...entry,
          flag: "limit"
        }
      : entry
  );

// Impure function: Has a side effect (console.log), but that's okay. In this
// context it's not possible to go 100% pure, but we just try to make our
// functions as pure as possible.
const logBigExpenses = (state, bigLimit) => {
  const bigExpensesEmojis = state
    .filter((entry) => entry.value <= -bigLimit)
    .map((entry) => entry.description.slice(-2))
    .join(" / ");

  console.log(bigExpensesEmojis);
};

const budget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const budget2 = addExpense(budget1, spendingLimits, 100, "Movies 🍿", "Mel");
const budget3 = addExpense(budget2, spendingLimits, 200, "Stuff", "Jay");

const finalBudget = checkExpenses(budget3, spendingLimits);

logBigExpenses(finalBudget, 500);

console.log(finalBudget);
