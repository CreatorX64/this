import { getFilters } from "./filters";
import { getRecipes, updateRecipe, removeIngredient } from "./recipes";

export const generateRecipeDOM = (recipe) => {
  const recipeElem = document.createElement("a");
  const titleElem = document.createElement("h2");
  const statusElem = document.createElement("p");

  recipeElem.setAttribute("href", `/edit.html#${recipe.id}`);
  recipeElem.classList.add("recipe");

  if (recipe.title.trim().length > 0) {
    titleElem.textContent = recipe.title;
  } else {
    titleElem.textContent = "Unnamed Recipe";
  }

  let determiner = "none";
  if (recipe.ingredients.length > 0) {
    if (recipe.ingredients.every((ingredient) => ingredient.isOwned)) {
      determiner = "all";
    } else if (recipe.ingredients.some((ingredient) => ingredient.isOwned)) {
      determiner = "some";
    }
  }
  statusElem.textContent = `You have ${determiner} of the ingredients`;

  recipeElem.appendChild(titleElem);
  recipeElem.appendChild(statusElem);

  return recipeElem;
};

export const renderRecipes = () => {
  const recipesElem = document.querySelector(".recipes");

  const filters = getFilters();
  const recipes = getRecipes();
  const filteredRecipes = recipes.filter((recipe) => {
    const searchTextPass = recipe.title.toLowerCase().includes(filters.searchText);
    const hideMissingPass = filters.hideMissing
      ? recipe.ingredients.length > 0 && recipe.ingredients.every((ingredient) => ingredient.isOwned)
      : true;

    return searchTextPass && hideMissingPass;
  });

  recipesElem.innerHTML = "";

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((recipe) => {
      const recipeElem = generateRecipeDOM(recipe);
      recipesElem.appendChild(recipeElem);
    });
  } else {
    const info = document.createElement("p");
    info.textContent = "No recipes to show. Clear Local Storage to get seed values.";
    info.classList.add("empty-message");
    recipesElem.appendChild(info);
  }
};

export const initializeEditPage = (recipeId) => {
  const titleElem = document.querySelector("#recipe-title");
  const instructionsElem = document.querySelector("#recipe-instructions");
  const ingredientListElem = document.querySelector("#ingredient-list");

  const recipes = getRecipes();
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (recipe === undefined) {
    location.assign("/index.html");
  }

  titleElem.value = recipe.title;
  instructionsElem.value = recipe.instructions;
  ingredientListElem.innerHTML = "";

  recipe.ingredients.forEach((ingredient) => {
    const ingredientElem = document.createElement("li");
    const labelElem = document.createElement("label");
    const checkboxElem = document.createElement("input");
    const spanElem = document.createElement("span");
    const removeElem = document.createElement("button");

    ingredientElem.classList.add("ingredient");

    checkboxElem.setAttribute("type", "checkbox");
    checkboxElem.checked = ingredient.isOwned;
    checkboxElem.classList.add("input-check");
    checkboxElem.addEventListener("change", (e) => {
      updateRecipe(recipeId, { isOwned: [ingredient.id, e.target.checked] });
      initializeEditPage(recipeId);
    });

    spanElem.textContent = ingredient.title;

    removeElem.textContent = "remove";
    removeElem.classList.add("remove");
    removeElem.addEventListener("click", (e) => {
      removeIngredient(recipeId, ingredient.id);
      initializeEditPage(recipeId);
    });

    labelElem.appendChild(checkboxElem);
    labelElem.appendChild(spanElem);
    ingredientElem.appendChild(labelElem);
    ingredientElem.appendChild(removeElem);
    ingredientListElem.appendChild(ingredientElem);
  });
};