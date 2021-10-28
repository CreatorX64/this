import { Component } from "react";
import "./Pokecard.css";

const POKE_API = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

function padToThree(number) {
  return number <= 999 ? `00${number}`.slice(-3) : number;
}

export class Pokecard extends Component {
  render() {
    const { id, name, type, exp } = this.props;
    let imgSrc = `${POKE_API}${padToThree(id)}.png`;

    return (
      <div className="Pokecard">
        <h1 className="Pokecard-title">{name}</h1>
        <div className="Pokecard-image">
          <img src={imgSrc} alt={name} />
        </div>
        <div className="Pokecard-data">Type: {type}</div>
        <div className="Pokecard-data">EXP: {exp}</div>
      </div>
    );
  }
}
