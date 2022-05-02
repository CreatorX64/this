import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import styles from "@/pages/create/Create.module.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInputRef = useRef(null);

  const navigate = useNavigate();
  const { initPostRequest, data, error, isPending } = useFetch(
    "http://localhost:8080/recipes",
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    initPostRequest({
      title,
      method,
      cookingTime: `${cookingTime} minutes`,
      ingredients
    });
  };

  const handleAddIngredient = (e) => {
    const ing = newIngredient.trim().toLowerCase();

    if (!ing || ingredients.includes(ing)) {
      return;
    }

    setIngredients((prevIngredients) => [...prevIngredients, ing]);
    setNewIngredient("");
    ingredientInputRef.current.focus();
  };

  // Redirect to home page upon successful form submission
  useEffect(() => {
    if (!isPending && !error && data) {
      navigate("/");
    }
  }, [isPending, error, data]);

  return (
    <div className={styles.create}>
      <h2 className="page-title">Add New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className={styles.ingredients}>
            <input
              ref={ingredientInputRef}
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <button
              type="button"
              className="button"
              onClick={handleAddIngredient}
            >
              Add
            </button>
          </div>
        </label>
        <p>
          Current ingredients: <em>{ingredients.join(", ")}</em>
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            required
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input
            required
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </label>

        <button type="submit" className="button" disabled={isPending}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
