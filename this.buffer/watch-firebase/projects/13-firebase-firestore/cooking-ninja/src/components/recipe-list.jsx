import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import styles from "@/components/recipe-list.module.css";
import { useThemeContext } from "@/hooks/theme-context";
import TrashIcon from "@/assets/trash-icon.svg";

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
            src={TrashIcon}
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
