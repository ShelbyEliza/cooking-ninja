import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

// styles:
import "./Search.css";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");
  const { mode } = useTheme();

  const url = "http://localhost:3000/recipes?q=" + query;
  const { error, isPending, data } = useFetch(url);
  console.log(data);

  return (
    <div className={`search-results ${mode}`}>
      <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
