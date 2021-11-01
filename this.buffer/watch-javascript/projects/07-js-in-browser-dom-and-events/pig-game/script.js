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

let scores; // Array of two numbers for player scores. E.g., [22, 17]
let activePlayer; // 0 or 1, depending on which player is active.
let currentScore; // Running score of the active player.
let isPlaying; // Current status of the game.

const setupNewGame = () => {
  elemScore0.textContent = 0;
  elemScore1.textContent = 0;
  elemCurrentScore0.textContent = 0;
  elemCurrentScore1.textContent = 0;
  elemPlayer0.classList.remove("player--winner");
  elemPlayer1.classList.remove("player--winner");
  elemPlayer0.classList.add("player--active");
  elemPlayer1.classList.remove("player--active");
  elemDice.classList.add("hidden");

  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  isPlaying = true;
};

const switchPlayer = () => {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  elemPlayer0.classList.toggle("player--active");
  elemPlayer1.classList.toggle("player--active");
};

setupNewGame();

// Roll dice functionality.
btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    // Generate random dice roll.
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display dice.
    elemDice.classList.remove("hidden");
    elemDice.src = `dice-${diceNumber}.png`;

    // Check for rolled 1.
    if (diceNumber !== 1) {
      // Add dice to current score
      currentScore += diceNumber;
      document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player.
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    // Add current score to active player's score.
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish game.
      isPlaying = false;
      elemDice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next player.
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", setupNewGame);
