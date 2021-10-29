"use strict";

const checkButton = document.querySelector(".check");
const againButton = document.querySelector(".again");
const guessInput = document.querySelector(".guess");
const numberElem = document.querySelector(".number");

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

checkButton.addEventListener("click", () => {
  const guess = Number(guessInput.value);

  if (!guess) {
    displayMessage("⛔ No number!");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct number!");
    numberElem.textContent = secretNumber;
    document.body.style.backgroundColor = "#60b347";
    numberElem.style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      displayHighScore(highScore);
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "☝ Too high!" : "👇 Too low!");
      --score;
      displayScore(score);
    } else {
      displayMessage("💥 You lost the game!");
      displayScore(0);
    }
  }
});

againButton.addEventListener("click", () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  displayMessage("Start guessing...");
  displayScore(score);
  numberElem.textContent = "?";
  guessInput.value = "";

  document.body.style.backgroundColor = "#222";
  numberElem.style.width = "15rem";
});

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function displayScore(score) {
  document.querySelector(".score").textContent = score;
}

function displayHighScore(score) {
  document.querySelector(".highscore").textContent = score;
}
