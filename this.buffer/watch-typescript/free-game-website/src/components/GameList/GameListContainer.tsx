import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { GameListRenderer } from "./GameListRenderer";
import { Game } from "types";
import { API_HOST, API_KEY } from "./constants";

export const GameListContainer: FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get("/games", {
        baseURL: `https://${API_HOST}/api`,
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY
        },
        params: {
          platform: "browser"
        }
      })
      .then((res) => setGames(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return <GameListRenderer error={error} games={games} />;
};
