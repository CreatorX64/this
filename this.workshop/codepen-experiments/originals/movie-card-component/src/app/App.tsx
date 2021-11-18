import "./styles.scss";
import { seed } from "../seed";
import { MovieCard } from "../features/MovieCard";

export const App = (): JSX.Element => {
  return (
    <div className="App">
      <MovieCard movies={seed} />
    </div>
  );
};
