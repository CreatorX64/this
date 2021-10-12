import { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Joke } from "./Joke";
import "./JokeList.css";

export class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = { jokes: [] };
    this.handleVote = this.handleVote.bind(this);
  }

  async componentDidMount() {
    const jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      const res = await axios.get("https://icanhazdadjoke.com", {
        headers: { accept: "application/json" }
      });
      jokes.push({ id: uuidv4(), text: res.data.joke, votes: 0 });
    }
    this.setState({ jokes });
  }

  handleVote(id, delta) {
    this.setState((state) => ({
      jokes: state.jokes.map((joke) =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    }));
  }

  render() {
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
          <button className="JokeList__get-more">New Jokes</button>
        </div>
        <div className="JokeList__jokes">
          {this.state.jokes.map((joke) => (
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
