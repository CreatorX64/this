import { setFilters } from "./filters";
import { createRecipe, loadRecipes } from "./recipes";
import { renderRecipes } from "./views";

renderRecipes();

document.querySelector("#create-recipe").addEventListener("click", (e) => {
  const id = createRecipe();
  location.assign(`/edit.html#${id}`);
});

document.querySelector("#filter-title").addEventListener("input", (e) => {
  setFilters({ searchText: e.target.value });
  renderRecipes();
});

document.querySelector("#hide-recipes").addEventListener("change", (e) => {
  setFilters({ hideMissing: e.target.checked });
  renderRecipes();
});

window.addEventListener("storage", (e) => {
  if (e.key === "recipes") {
    loadRecipes();
    renderRecipes();
  }
});