import RecipeList from "@/components/recipe-list";
import { useFetch } from "@/hooks/fetch";
import styles from "@/pages/home.module.css";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:8080/recipes");

  return (
    <div className={styles.home}>
      {error && <p className="error">{error}</p>}

      {isPending && <p className="loading">Loading...</p>}

      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
