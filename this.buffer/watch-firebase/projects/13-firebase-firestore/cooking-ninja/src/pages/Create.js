import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import { firestore } from "lib/firebase";
import styles from "pages/Create.module.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      title,
      method,
      cookingTime: `${cookingTime} minutes`,
      ingredients
    };

    try {
      await addDoc(collection(firestore, "recipes"), doc);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
