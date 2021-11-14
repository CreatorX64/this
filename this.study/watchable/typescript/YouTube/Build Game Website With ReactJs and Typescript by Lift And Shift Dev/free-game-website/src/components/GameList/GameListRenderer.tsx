import React, { ChangeEvent, Fragment, ReactElement } from "react";
import { Game } from "types";
import { GameCard } from "components/GameCard";
import { GameFilter } from "components/GameFilter";
import { List, ListItem } from "./styles";

interface Props {
  games: Game[];
  error?: string;
  onFilterChange: (e: ChangeEvent<HTMLFormElement>) => void;
}

export const GameListRenderer = ({
  error,
  games,
  onFilterChange
}: Props): ReactElement => {
  if (error) {
    return <p>Unable to fetch games</p>;
  }
  if (!games?.length) {
    return <p>No games available.</p>;
  }

  return (
    <Fragment>
      <GameFilter onChange={onFilterChange} />
      <List>
        {games.map((game) => (
          <ListItem key={game.id}>
            <GameCard content={game} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};
