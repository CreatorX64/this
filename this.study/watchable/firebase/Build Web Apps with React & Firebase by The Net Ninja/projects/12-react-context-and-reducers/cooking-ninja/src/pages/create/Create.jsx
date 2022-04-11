import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import styles from "./Create.module.css";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInputRef = useRef(null);
  const navigate = useNavigate();
  const { setPostBody, data, error, isPending } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setPostBody({
      title,
      ingredients,
      method,
      cookingTime: `${cookingTime} minutes`
    });
  };

  const handleAddIngredient = (evt) => {
    evt.preventDefault();
    const ingredient = newIngredient.trim();

    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    }

    setNewIngredient("");
    ingredientInputRef.current.focus();
  };

  useEffect(() => {
    if (data) {
      navigate("/", { replace: true });
    }
  }, [data]);

  return (
    <div className={styles.create}>
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title</span>
          <input
            type="text"
            onChange={(evt) => setTitle(evt.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients</span>
          <div className={styles.ingredients}>
            <input
              ref={ingredientInputRef}
              type="text"
              onChange={(evt) => setNewIngredient(evt.target.value)}
              value={newIngredient}
            />
            <button className="btn" type="button" onClick={handleAddIngredient}>
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          <span className={styles.ingredientList}>
            {ingredients.join(", ")}
          </span>
        </p>

        <label>
          <span>Recipe method</span>
          <textarea
            onChange={(evt) => setMethod(evt.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes)</span>
          <input
            type="number"
            onChange={(evt) => setCookingTime(evt.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};