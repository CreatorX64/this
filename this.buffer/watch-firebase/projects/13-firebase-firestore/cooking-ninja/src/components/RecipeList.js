import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";

import { firestore } from "lib/firebase";
import useThemeContext from "hooks/useThemeContext";
import styles from "components/RecipeList.module.css";
import trashIcon from "assets/trash-icon.svg";

const RecipeList = ({ recipes }) => {
  const { mode } = useThemeContext();

  const handleDelete = (id) => {
    deleteDoc(doc(firestore, "recipes", id));
  };

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
          <img
            src={trashIcon}
            alt="Trash icon"
            aria-label="Delete recipe"
            className={styles.delete}
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
