import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Game } from "types";

type Props = {
  content: Game;
};

export const GameCard: FC<Props> = ({ content }) => {
  const { id, title, thumbnail, short_description, genre } = content;

  return (
    <Link to={`/game/${id}`}>
      <img alt={`${title} logo`} src={thumbnail} />
      <h2>{title}</h2>
      <p>{short_description}</p>
      <p>{genre}</p>
    </Link>
  );
};
