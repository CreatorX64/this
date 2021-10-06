import { Component } from "react";
import { Coin } from "./Coin";
import { choice } from "./helpers";
import headsImage from "./heads.jpg";
import tailsImage from "./tails.jpg";

export class CoinFlipper extends Component {
  static defaultProps = {
    coins: [
      { side: "heads", imgSrc: headsImage },
      { side: "tails", imgSrc: tailsImage }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      currCoin: null,
      nFlips: 0,
      nHeads: 0,
      nTails: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  flipCoin() {
    const newCoin = choice(this.props.coins);
    this.setState((st) => ({
      currCoin: newCoin,
      nFlips: st.nFlips + 1,
      nHeads: st.nHeads + (newCoin.side === "heads" ? 1 : 0),
      nTails: st.nTails + (newCoin.side === "tails" ? 1 : 0)
    }));
  }

  handleClick(e) {
    this.flipCoin();
  }

  render() {
    const { currCoin, nFlips, nHeads, nTails } = this.state;

    return (
      <div className="coin-container">
        <h2>Let's flip a coin!</h2>
        {currCoin && <Coin info={currCoin} />}
        <button onClick={this.handleClick}>Flip Coin</button>
        <p>
          Out of {nFlips} flips, there have been {nHeads} heads and {nTails}{" "}
          tails.
        </p>
      </div>
    );
  }
}
