import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { RecipeList } from "../../components/RecipeList";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const url = `http://localhost:3000/recipes?q=${query}`;
  const { isPending, error, data: recipes } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">Recipes including &ldquo;{query}&rdquo;</h2>

      {error && <p className="error">{error}</p>}

      {isPending && <p className="loading">Loading...</p>}

      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};
