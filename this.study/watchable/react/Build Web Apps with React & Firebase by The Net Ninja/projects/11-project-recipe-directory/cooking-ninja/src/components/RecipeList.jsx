import { Link } from "react-router-dom";
import styles from "./RecipeList.module.css";

export const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <div className="error">No recipes to load :(</div>;
  }

  return (
    <div className={styles.list}>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={styles.card}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this &rarr;</Link>
        </div>
      ))}
    </div>
  );
};
