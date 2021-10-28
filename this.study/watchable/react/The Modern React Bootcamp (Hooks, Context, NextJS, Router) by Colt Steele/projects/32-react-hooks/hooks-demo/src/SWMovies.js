import { useState, useEffect } from "react";
import axios from "axios";

export default function SWMovies() {
  const [movieId, setMovieId] = useState(1);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `https://swapi.dev/api/films/${movieId}`
      );
      setMovie(response.data);
    }
    getData();
  }, [movieId]);

  return (
    <div>
      <h1>Pick A Movie</h1>
      <h4>You chose: {movie.title}</h4>
      <p>{movie.opening_crawl}</p>
      <select
        value={movieId}
        onChange={(event) => setMovieId(event.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  );
}
