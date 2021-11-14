import React, { FC } from "react";
import { Game } from "types";
import { GameCard } from "components/GameCard";

type Props = {
  error?: string;
  games: Game[];
};

export const GameListRenderer: FC<Props> = ({ error, games }) => {
  if (error) {
    return <p>Unable to fetch games</p>;
  }
  if (!games?.length) {
    return <p>No games available.</p>;
  }

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          <GameCard content={game} />
        </li>
      ))}
    </ul>
  );
};
