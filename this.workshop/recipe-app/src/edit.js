import { loadRecipes, updateRecipe, removeRecipe, createIngredient } from "./recipes";
import { initializeEditPage } from "./views";

const titleElem = document.querySelector("#recipe-title");
const instructionsElem = document.querySelector("#recipe-instructions");
const ingredientInputElem = document.querySelector("#ingredient-input");
const ingredientAddElem = document.querySelector("#ingredient-add");
const removeElem = document.querySelector("#remove-recipe");

const recipeId = location.hash.substring(1);
initializeEditPage(recipeId);

titleElem.addEventListener("input", (e) =>
{
  updateRecipe(recipeId, { title: e.target.value });
});

instructionsElem.addEventListener("input", (e) =>
{
  updateRecipe(recipeId, { instructions: e.target.value }); 
});

ingredientAddElem.addEventListener("click", (e) =>
{
  const ingredientText = ingredientInputElem.value.trim();

  if (ingredientText.length > 0)
  {
    createIngredient(recipeId, ingredientText);
    ingredientInputElem.value = "";
    initializeEditPage(recipeId);
  }
});

ingredientInputElem.addEventListener("keydown", (e) =>
{
  if (e.key === "Enter")
  {
    const ingredientText = ingredientInputElem.value.trim();

    if (ingredientText.length > 0)
    {
      createIngredient(recipeId, ingredientText);
      ingredientInputElem.value = "";
      initializeEditPage(recipeId);
    }
  }
})

removeElem.addEventListener("click", () =>
{
  removeRecipe(recipeId);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) =>
{
  if (e.key === "recipes")
  {
    loadRecipes();
    initializeEditPage(recipeId);
  }
});