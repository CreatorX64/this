"use strict";

const btnCheck = document.querySelector(".check");
const btnAgain = document.querySelector(".again");
const inputGuess = document.querySelector(".guess");
const elemNumber = document.querySelector(".number");

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

const displayScore = (score) => {
  document.querySelector(".score").textContent = score;
};

const displayHighScore = (score) => {
  document.querySelector(".highscore").textContent = score;
};

btnCheck.addEventListener("click", () => {
  const guess = Number(inputGuess.value);

  if (!guess) {
    displayMessage("⛔ No number!");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct number!");
    elemNumber.textContent = secretNumber;
    document.body.style.backgroundColor = "#60b347";
    elemNumber.style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      displayHighScore(highScore);
    }
  } else if (score > 1) {
    displayMessage(guess > secretNumber ? "☝ Too high!" : "👇 Too low!");
    --score;
    displayScore(score);
  } else {
    displayMessage("💥 You lost the game!");
    displayScore(0);
  }
});

btnAgain.addEventListener("click", () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  displayMessage("Start guessing...");
  displayScore(score);
  elemNumber.textContent = "?";
  inputGuess.value = "";

  document.body.style.backgroundColor = "#222";
  elemNumber.style.width = "15rem";
});
