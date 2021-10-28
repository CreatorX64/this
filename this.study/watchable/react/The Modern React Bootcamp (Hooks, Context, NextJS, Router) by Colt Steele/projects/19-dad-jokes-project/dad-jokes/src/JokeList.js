import { Component } from "react";
import axios from "axios";
import { Joke } from "./Joke";
import "./JokeList.css";

export class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      isLoading: false
    };
    this.seenJokes = new Set(this.state.jokes.map((joke) => joke.id));
    this.handleClickNewJokes = this.handleClickNewJokes.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }

  async getJokes() {
    try {
      const jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        const res = await axios.get("https://icanhazdadjoke.com", {
          headers: { accept: "application/json" }
        });
        const newJoke = res.data;

        if (!this.seenJokes.has(newJoke.id)) {
          jokes.push({ id: newJoke.id, text: newJoke.joke, votes: 0 });
          this.seenJokes.add(newJoke.id);
        }
      }

      this.setState(
        (state) => ({
          jokes: [...state.jokes, ...jokes],
          isLoading: false
        }),
        () => {
          window.localStorage.setItem(
            "jokes",
            JSON.stringify(this.state.jokes)
          );
        }
      );
    } catch (error) {
      alert(error);
      this.setState({ isLoading: false });
    }
  }

  handleVote(id, delta) {
    this.setState(
      (state) => ({
        jokes: state.jokes.map((joke) =>
          joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        )
      }),
      () => {
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
      }
    );
  }

  handleClickNewJokes() {
    this.setState({ isLoading: true }, this.getJokes);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="JokeList__spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList__title">Loading...</h1>
        </div>
      );
    }

    const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <div className="JokeList__sidebar">
          <h1 className="JokeList__title">
            <span className="JokeList__emphasize">Dad</span>
            <br />
            Jokes
          </h1>
          <img
            src="https://dryicons.com/icon_download/flat-laughing-with-tears-emoticon-icon-8927"
            alt="Laugh emoji"
            className="JokeList__logo"
          />
          <button
            className="JokeList__get-more"
            onClick={this.handleClickNewJokes}
          >
            Fetch Jokes
          </button>
        </div>
        <div className="JokeList__jokes">
          {jokes.map((joke) => (
            <Joke
              key={joke.id}
              id={joke.id}
              votes={joke.votes}
              text={joke.text}
              upVote={() => this.handleVote(joke.id, 1)}
              downVote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}
