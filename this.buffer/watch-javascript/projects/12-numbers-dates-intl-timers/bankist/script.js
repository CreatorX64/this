"use strict";

//#region Seed data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: "1111",
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z"
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
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z"
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

let currentAccount;
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
    containerApp.style.opacity = 1;

    // Clear fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();

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

    // Update UI
    updateUi(currentAccount);
  }
});

btnLoan.addEventListener("click", (event) => {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUi(currentAccount);
  }

  inputLoanAmount.value = "";
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
  displayMovements(currentAccount.movements, isSorted);
});
//#endregion

//#region Functions
function updateUi(account) {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
}

function displayMovements(movements, isSorted = false) {
  containerMovements.innerHTML = "";

  const orderedMovements = isSorted
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  orderedMovements.forEach((mov, idx) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${idx + 1} ${type}
        </div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calcDisplayBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
}

function calcDisplaySummary({ movements, interestRate }) {
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

  labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
}

function createUsernames(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
}
//#endregion
