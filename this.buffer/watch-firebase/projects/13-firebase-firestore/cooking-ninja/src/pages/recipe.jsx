import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import styles from "@/pages/recipe.module.css";
import { useThemeContext } from "@/hooks/theme-context";

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const { mode } = useThemeContext();

  const handleUpdate = () => {
    updateDoc(doc(firestore, "recipes", id), {
      title: "Something Completely Different"
    });
  };

  useEffect(() => {
    setIsPending(true);

    const unsubscribe = onSnapshot(
      doc(firestore, "recipes", id),
      (snapshot) => {
        if (snapshot.exists()) {
          setIsPending(false);
          setRecipe(snapshot.data());
        } else {
          setIsPending(false);
          setError("Could not find recipe");
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={`${styles.recipe} ${styles[mode]}`}>
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
          <button onClick={handleUpdate}>Update Me</button>
        </>
      )}
    </div>
  );
};

export default Recipe;
