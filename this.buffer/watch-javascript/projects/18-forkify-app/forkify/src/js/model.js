import { API_URL, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE
  }
};

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (err) {
    // You can do some custom logging logic here
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;

    state.search.results = recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url
    }));
  } catch (err) {
    // You can do some custom logging logic here
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.currentPage) => {
  state.search.currentPage = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
