import { API_KEY, API_URL, RESULTS_PER_PAGE } from "./config";
import { fetchJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    currentPage: 1,
    resultsPerPage: RESULTS_PER_PAGE
  },
  bookmarks: []
};

const createRecipeObject = (data) => {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key })
  };
};

export const loadRecipe = async (id) => {
  try {
    const data = await fetchJSON(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);

    // If the recipe was bookmarked before, mark it
    if (state.bookmarks.some((bookmark) => bookmark.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(err);
    // You can do some custom logging logic here
    throw err;
  }
};

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;

    const data = await fetchJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
    const { recipes } = data.data;

    state.search.results = recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      ...(recipe.key && { key: recipe.key })
    }));
    state.search.currentPage = 1;
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

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }

  persistBookmarks();
};

export const deleteBookmark = (id) => {
  // Delete from bookmarks so that when user comes back, the recipe is
  // not bookmarked
  state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== id);

  // Update the current recipe so that the user can immediately see the recipe
  // is not bookmarked anymore
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }

  persistBookmarks();
};

export const uploadRecipe = async (newRecipe) => {
  const ingredients = Object.entries(newRecipe)
    .filter(
      (entry) => entry[0].startsWith("ingredient") && entry[1].trim() !== ""
    )
    .map((ing) => {
      const ingArr = ing[1].split(",").map((elem) => elem.trim());

      if (ingArr.length !== 3) {
        throw new Error(
          "Wrong ingredient format! Please use the correct format :)"
        );
      }

      const [quantity, unit, description] = ingArr;

      return {
        quantity: quantity ? Number(quantity) : null,
        unit,
        description
      };
    });

  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: Number(newRecipe.cookingTime),
    servings: Number(newRecipe.servings),
    ingredients
  };

  const data = await fetchJSON(`${API_URL}?key=${API_KEY}`, recipe);
  state.recipe = createRecipeObject(data);
  addBookmark(state.recipe);
};

const init = () => {
  const storage = localStorage.getItem("bookmarks");

  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};

init();
