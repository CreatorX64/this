"use strict";

const elemPlayer0 = document.querySelector(".player--0");
const elemPlayer1 = document.querySelector(".player--1");
const elemScore0 = document.querySelector(".score--0");
const elemScore1 = document.querySelector(".score--1");
const elemCurrentScore0 = document.querySelector(".current--0");
const elemCurrentScore1 = document.querySelector(".current--1");
const elemDice = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;

elemScore0.textContent = 0;
elemScore1.textContent = 0;
elemDice.classList.add("hidden");

btnRoll.addEventListener("click", () => {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;

  elemDice.classList.remove("hidden");
  elemDice.src = `dice-${diceNumber}.png`;

  if (diceNumber !== 1) {
    currentScore += diceNumber;
    document.querySelector(`.current--${activePlayer}`).textContent =
      currentScore;
  } else {
    document.querySelector(`.current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    elemPlayer0.classList.toggle("player--active");
    elemPlayer1.classList.toggle("player--active");
  }
});
