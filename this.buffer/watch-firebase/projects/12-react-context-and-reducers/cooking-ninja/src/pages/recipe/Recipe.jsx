import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import styles from "@/pages/recipe/Recipe.module.css";

const Recipe = () => {
  const { id } = useParams();
  const {
    data: recipe,
    isPending,
    error
  } = useFetch(`http://localhost:8080/recipes/${id}`);

  return (
    <div className={styles.recipe}>
      {error && <p className="error">{error}</p>}

      {isPending && <p className="loading">Loading...</p>}

      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className={styles.method}>{recipe.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
