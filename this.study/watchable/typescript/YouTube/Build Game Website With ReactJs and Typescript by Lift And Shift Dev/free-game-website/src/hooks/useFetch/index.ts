import { useState, useEffect } from "react";
import axios from "axios";
import { Game } from "types";
import { Filter } from "components/GameList/types";
import { API_HOST, API_KEY } from "./constants";

type Response = {
  games: Game[];
  error?: string;
};

export const useFetch = (params: Filter): Response => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string>("");
  const { platform, genre, tag, sortBy } = params;

  useEffect(() => {
    axios
      .get("/games", {
        baseURL: `https://${API_HOST}/api`,
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY
        },
        params: {
          platform,
          category: genre,
          tag,
          "sort-by": sortBy
        }
      })
      .then((res) => setGames(res.data))
      .catch((err) => setError(err.message));
  }, [platform, genre, tag, sortBy]);

  return { games, error };
};
