import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// hooks & components:
import { useTheme } from "../hooks/useTheme";
import { useCollection } from "../hooks/useCollection";
import RecipeList from "../components/RecipeList";

export default function Search() {
  const [recipes, setRecipes] = useState([]);

  const { mode } = useTheme();
  const { documents: allDocuments } = useCollection("recipes");

  const { query } = useParams();
  const queryLower = query.toLowerCase();
  const queryUpper = queryLower
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");

  useEffect(() => {
    let results = [];
    const queryTerms = [query, queryLower, queryUpper];
    if (allDocuments) {
      allDocuments.forEach((doc) => {
        if (queryTerms.includes(doc.title)) {
          results.push(doc);
        } else {
          doc.ingredients.forEach((ing) => {
            if (
              ing.includes(queryTerms[0]) ||
              ing.includes(queryTerms[1]) ||
              ing.includes(queryTerms[2])
            ) {
              results.push(doc);
            }
          });
        }
      });
    }
    setRecipes(results);
  }, [allDocuments, query, queryLower, queryUpper]);

  return (
    <div className="search-results">
      <h2 className={`page-title ${mode}`}>Searching for Recipes including:</h2>
      {query && <h3 className={`page-title ${mode}`}>"{query}"</h3>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
