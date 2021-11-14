import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { useFetch } from "hooks/useFetch";
import { GameListRenderer } from "./GameListRenderer";
import { Filter } from "./types";

export const GameListContainer: FC = () => {
  const [filter, setFilter] = useState<Filter>({
    platform: "browser",
    sortBy: "relevance"
  });
  const { games, error } = useFetch(filter);

  const onFilterChange = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }, []);

  return (
    <GameListRenderer
      error={error}
      games={games}
      onFilterChange={onFilterChange}
    />
  );
};
