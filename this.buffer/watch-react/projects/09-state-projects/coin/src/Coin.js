import { Component } from "react";
import "./Coin.css";

export class Coin extends Component {
  render() {
    const { info } = this.props;
    return (
      <div className="coin">
        <img className="coin__image" src={info.imgSrc} alt={info.side} />
      </div>
    );
  }
}
