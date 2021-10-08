import { Component } from "react";
import { getRandomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

export class Hangman extends Component {
  static defaultProps = {
    maxWrongs: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      correctGuesses: new Set(),
      answer: getRandomWord()
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    this.setState({
      nWrong: 0,
      correctGuesses: new Set(),
      answer: getRandomWord()
    });
  }

  getGuessedWord() {
    const { answer, correctGuesses } = this.state;
    return answer
      .split("")
      .map((letter) => (correctGuesses.has(letter) ? letter : "_"))
      .join("");
  }

  handleGuess(event) {
    let letter = event.target.value;
    this.setState((prevState) => ({
      correctGuesses: prevState.correctGuesses.add(letter),
      nWrong: prevState.nWrong + (prevState.answer.includes(letter) ? 0 : 1)
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        key={letter}
        className="hangman__button"
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.correctGuesses.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  render() {
    const isLoser = this.state.nWrong >= this.props.maxWrongs;
    const isWinner = this.getGuessedWord() === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrongs} guesses`;
    let gameState = this.generateButtons();

    if (isWinner) {
      gameState = "You Win!";
    } else if (isLoser) {
      gameState = "You Lose!";
    }

    return (
      <div className="hangman">
        <h1 className="hangman__title">Hangman</h1>
        <img
          className="hangman__img"
          src={this.props.images[this.state.nWrong]}
          alt={altText}
        />
        <p className="hangman__status">
          Incorrect Guesses: {this.state.nWrong}
        </p>
        <p className="hangman__word">
          {!isLoser ? this.getGuessedWord() : this.state.answer}
        </p>
        <p className="hangman__buttons">{gameState}</p>
        <button
          className="hangman__button hangman__button--block"
          onClick={this.resetGame}
        >
          Restart?
        </button>
      </div>
    );
  }
}
