import { useFetch } from "../../hooks/useFetch";
import { RecipeList } from "../../components/RecipeList";
import styles from "./Home.module.css";

export const Home = () => {
  const {
    data: recipes,
    isPending,
    error
  } = useFetch("http://localhost:3000/recipes");

  return (
    <div className={styles.home}>
      {error && <p className="error">{error}</p>}

      {isPending && <p className="loading">Loading...</p>}

      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};
