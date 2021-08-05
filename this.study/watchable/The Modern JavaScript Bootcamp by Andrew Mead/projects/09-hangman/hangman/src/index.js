import Hangman from "./hangman";
import getPuzzle from "./requests";

const puzzleElem = document.querySelector("#puzzle");
const statusElem = document.querySelector("#status");
const resetElem = document.querySelector("#reset");
let game;

const render = () =>
{
  puzzleElem.innerHTML = "";
  statusElem.textContent = game.statusMessage;

  game.puzzle.split("").forEach(letter =>
  {
    const letterElem = document.createElement("span");
    letterElem.textContent = letter;
    puzzleElem.appendChild(letterElem);
  });
};

const startGame = async () =>
{
  const puzzle = await getPuzzle("2");
  game = new Hangman(puzzle, 5);
  render();
};

window.addEventListener("keydown", e =>
{
  const guess = e.key;

  if (guess.match(/^[0-9A-Za-z]+$/))
  {
    game.makeGuess(guess);
    render();
  }
});

resetElem.addEventListener("click", startGame);

startGame();