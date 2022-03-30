// styles:
import "./Search.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useCollection } from "../../hooks/useCollection";
import RecipeList from "../../components/RecipeList";

export default function Search() {
  const [recipes, setRecipes] = useState([]);
  const { mode } = useTheme();
  const { query } = useParams();
  const queryLower = query.toLowerCase();
  const queryUpper = queryLower
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");

  const { documents } = useCollection("recipes", [
    "ingredients",
    "array-contains-any",
    [query, queryLower, queryUpper],
  ]);

  useEffect(() => {
    if (documents) {
      setRecipes(documents);
    }
  }, [documents]);

  return (
    <div className={`search-results ${mode}`}>
      <h2 className={`page-title ${mode}`}>Search Page</h2>
      {query && (
        <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
      )}
      {documents && <RecipeList recipes={recipes} />}
    </div>
  );
}
