class Hangman
{
  constructor(word, remainingGuesses)
  {
    this.word = word.toLowerCase().split("");
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = "playing";  // playing | finished | failed
  }

  calculateStatus()
  {
    if (this.remainingGuesses === 0)
    {
      this.status = "failed";
    }
    else if (this.word.every(letter => this.guessedLetters.includes(letter) || letter === " "))
    {
      this.status = "finished";
    }
    else
    {
      this.status = "playing";
    }
  }

  get statusMessage()
  {
    let message;

    if (this.status === "playing")
    {
      message = `Guesses left: ${this.remainingGuesses}`;
    }
    else if (this.status === "failed")
    {
      message = `Nice try! The word was "${this.word.join("")}".`;
    }
    else
    {
      message = `Great work! You guessed the word.`;
    }

    return message;
  }

  get puzzle()
  {
    let puzzle = "";

    this.word.forEach(letter =>
    {
      if (this.guessedLetters.includes(letter) || letter === " ")
      {
        puzzle += letter;
      }
      else
      {
        puzzle += "*";
      }
    });

    return puzzle;
  }

  makeGuess(guess)
  {
    if (this.status !== "playing")
    {
      return;
    }
    
    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadGuess = !this.word.includes(guess);

    if (isUnique)
    {
      this.guessedLetters.push(guess);
    }

    if (isUnique && isBadGuess)
    {
      this.remainingGuesses--;
    }

    this.calculateStatus();
  }
}

export { Hangman as default };