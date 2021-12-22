import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { RecipeList } from "../../components/RecipeList";
import styles from "./Home.module.css";

export const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = onSnapshot(
      collection(db, "recipes"),
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results = [];

          snapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data()
            });
          });

          setData(results);
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
  }, []);

  return (
    <div className={styles.home}>
      {error && <p className="error">{error}</p>}

      {isPending && <p className="loading">Loading...</p>}

      {data && <RecipeList recipes={data} />}
    </div>
  );
};
