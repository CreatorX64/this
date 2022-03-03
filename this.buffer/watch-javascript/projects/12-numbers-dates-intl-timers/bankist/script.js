"use strict";

//#region Seed data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: "1111",
  movementsDates: [
    "2021-12-06T09:15:04.904Z",
    "2021-12-04T21:31:17.178Z",
    "2021-12-03T07:42:02.383Z",
    "2021-11-29T14:11:59.604Z",
    "2021-10-22T10:17:24.185Z",
    "2021-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
    "2021-07-12T10:51:36.790Z"
  ],
  currency: "EUR",
  locale: "pt-PT" // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: "2222",
  movementsDates: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-06T06:04:23.907Z",
    "2021-01-25T14:18:46.235Z",
    "2021-02-05T16:33:06.386Z",
    "2021-04-10T14:43:26.374Z",
    "2021-06-25T18:49:59.371Z",
    "2021-07-26T12:01:20.894Z"
  ],
  currency: "USD",
  locale: "en-US"
};

const accounts = [account1, account2];
//#endregion

//#region DOM elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
//#endregion

let currentAccount; // Currently logged in account.
let logoutTimer;
let isSorted = false;
createUsernames(accounts);

//#region Event handlers
btnLogin.addEventListener("click", (event) => {
  event.preventDefault();

  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === inputLoginPin.value) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date & time
    const now = new Date();

    // Manually creating the date format
    // const day = now.getDate().toString().padStart(2, "0");
    // const month = (now.getMonth() + 1).toString().padStart(2, "0");
    // const year = now.getFullYear();
    // const hour = now.getHours().toString().padStart(2, "0");
    // const min = now.getMinutes().toString().padStart(2, "0");
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Using the user locale to generate the date format
    const options = {
      year: "numeric", // "numeric", "2-digit"
      month: "numeric", // "numeric", "long", "2-digit"
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
      // weekday: "long" // "long", "short", "narrow"
    };
    // const locale = navigator.language;
    const locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );

    // Clear fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();

    if (logoutTimer) {
      clearInterval(logoutTimer);
    }
    logoutTimer = startLogOutTimer();

    // Update UI
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  if (
    receiverAccount &&
    receiverAccount.username !== currentAccount.username &&
    amount > 0 &&
    currentAccount.balance >= amount
  ) {
    // Do the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date
    const transferDate = new Date().toISOString();
    currentAccount.movementsDates.push(transferDate);
    receiverAccount.movementsDates.push(transferDate);

    // Update UI
    updateUi(currentAccount);

    // Reset timer
    clearInterval(logoutTimer);
    logoutTimer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", (event) => {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUi(currentAccount);
    }, 2500);
  }

  inputLoanAmount.value = "";

  // Reset timer
  clearInterval(logoutTimer);
  logoutTimer = startLogOutTimer();
});

btnClose.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = "";
  inputClosePin.value = "";
});

btnSort.addEventListener("click", (event) => {
  event.preventDefault();
  isSorted = !isSorted;
  displayMovements(currentAccount, isSorted);

  // Reset timer
  clearInterval(logoutTimer);
  logoutTimer = startLogOutTimer();
});
//#endregion

//#region Functions
function createUsernames(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
}

function updateUi(account) {
  // Display movements
  displayMovements(account);
  // Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
}

function displayMovements(account, isSorted = false) {
  const { movements, movementsDates } = account;

  containerMovements.innerHTML = "";

  const orderedMovements = isSorted
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  orderedMovements.forEach((mov, idx) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(movementsDates[idx]);
    const displayDate = formatMovementDate(date, account.locale);
    const formattedMov = formatCurrency(mov, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${idx + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calcDisplayBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = formatCurrency(
    account.balance,
    account.locale,
    account.currency
  );
}

function calcDisplaySummary({ movements, interestRate, locale, currency }) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);
  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumIn.textContent = formatCurrency(incomes, locale, currency);
  labelSumOut.textContent = formatCurrency(Math.abs(out), locale, currency);
  labelSumInterest.textContent = formatCurrency(interest, locale, currency);
}

function startLogOutTimer() {
  // Set time
  let time = 120;

  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log user out
    if (time === 0) {
      clearInterval(logoutTimer);
      labelWelcome.textContent = "Login to get started";
      containerApp.style.opacity = 0;
    }

    // Decresase 1s
    --time;
  }

  // Call timer every second
  tick();
  return setInterval(tick, 1000);
}

function formatMovementDate(date, locale) {
  function calcDaysPassed(date1, date2) {
    // Dates are automatically converted to timestamps for subtraction
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) {
    return "Today";
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  }

  // Manually creating a formatted date string
  // const day = date.getDate().toString().padStart(2, "0");
  // const month = (date.getMonth() + 1).toString().padStart(2, "0");
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  // Using the current user's locale to format date
  return new Intl.DateTimeFormat(locale).format(date);
}

function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(value);
}
//#endregion
