import { Link } from "react-router-dom";

import styles from "components/RecipeList.module.css";
import useThemeContext from "hooks/useThemeContext";

const RecipeList = ({ recipes }) => {
  const { mode } = useThemeContext();

  if (recipes.length === 0) {
    return <p className="error">No recipes to load.</p>;
  }

  return (
    <div className={styles.recipeList}>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`${styles.card} ${styles[mode]}`}>
          <h3>{recipe.title}</h3>
          <small>{recipe.cookingTime} to make</small>
          <p>{recipe.method.substring(0, 100)}...</p>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
