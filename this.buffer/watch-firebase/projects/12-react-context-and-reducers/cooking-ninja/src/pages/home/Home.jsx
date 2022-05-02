import RecipeList from "@/components/RecipeList";
import useFetch from "@/hooks/useFetch";
import styles from "@/pages/home/Home.module.css";

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
