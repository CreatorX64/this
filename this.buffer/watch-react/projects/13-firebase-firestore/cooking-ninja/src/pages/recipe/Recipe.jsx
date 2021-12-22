import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Recipe.module.css";

export const Recipe = () => {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = onSnapshot(
      doc(db, "recipes", id),
      (snapshot) => {
        if (snapshot.exists()) {
          setRecipe(snapshot.data());
          setIsPending(false);
        } else {
          setError("Could not find that recipe");
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => {
      unsub();
    };
  }, [id]);

  const handleClick = async () => {
    await updateDoc(doc(db, "recipes", id), {
      title: "Something completely different"
    });
  };

  return (
    <div className={`${styles.recipe} ${styles[mode] ?? ""}`}>
      {error && <p className="error">{error}</p>}

      {isPending && <p className="loading">Loading...</p>}

      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className={styles.method}>{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
};
