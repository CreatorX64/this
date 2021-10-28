import { Component } from "react";
import { Pokecard } from "./Pokecard";
import "./Pokedex.css";

export class Pokedex extends Component {
  render() {
    const { exp, isWinner, pokemon } = this.props;
    let title;

    if (isWinner) {
      title = <h1 className="Pokedex-winner">Winning Hand</h1>;
    } else {
      title = <h1 className="Pokedex-loser">Losing Hand</h1>;
    }

    return (
      <div className="Pokedex">
        {title}
        <h4>Total Experience: {exp}</h4>
        <div className="Pokedex-cards">
          {pokemon.map((p) => (
            <Pokecard
              key={p.id}
              id={p.id}
              name={p.name}
              type={p.type}
              exp={p.base_experience}
            />
          ))}
        </div>
      </div>
    );
  }
}
