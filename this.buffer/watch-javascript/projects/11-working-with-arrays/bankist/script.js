"use strict";

//#region Seed data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: "1111"
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: "2222"
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: "3333"
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: "4444"
};

const accounts = [account1, account2, account3, account4];
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

  const amount = Number(inputLoanAmount.value);

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
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calcDisplayBalance(account) {
  account.balance = account.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${account.balance}€`;
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

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${interest}€`;
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
