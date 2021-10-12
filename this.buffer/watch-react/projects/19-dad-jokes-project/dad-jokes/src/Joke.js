import { Component } from "react";
import "./Joke.css";

export class Joke extends Component {
  getColor() {
    const { votes } = this.props;
    if (votes >= 15) {
      return "#4caf50";
    } else if (votes >= 12) {
      return "#8bc34a";
    } else if (votes >= 9) {
      return "#cddc39";
    } else if (votes >= 6) {
      return "#ffeb3b";
    } else if (votes >= 3) {
      return "#ffc107";
    } else if (votes >= 0) {
      return "#ff9800";
    } else {
      return "#f44366";
    }
  }

  getEmoji() {
    const { votes } = this.props;
    if (votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 12) {
      return "em em-laughing";
    } else if (votes >= 9) {
      return "em em-smiley";
    } else if (votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 3) {
      return "em em-neutral_face";
    } else if (votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  render() {
    const { votes, text, upVote, downVote } = this.props;
    return (
      <div className="Joke">
        <div className="Joke__buttons">
          <i
            className="fas fa-arrow-up Joke__vote-icon Joke__vote-icon--up"
            onClick={upVote}
          />
          <span
            className="Joke__votes"
            style={{ borderColor: this.getColor() }}
          >
            {votes}
          </span>
          <i
            className="fas fa-arrow-down Joke__vote-icon Joke__vote-icon--down"
            onClick={downVote}
          />
        </div>
        <div className="Joke__text">{text}</div>
        <div className="Joke__smiley-icon">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    );
  }
}
