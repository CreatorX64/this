import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import RecipeList from "@/components/recipe-list";
import styles from "@/pages/home.module.css";

const Home = () => {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsubscribe = onSnapshot(
      collection(firestore, "recipes"),
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          const results = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setRecipes(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.home}>
      {error && <p className="error">{error}</p>}

      {isPending && <p className="loading">Loading...</p>}

      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Home;
