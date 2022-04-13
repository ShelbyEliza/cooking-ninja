import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

// styles:
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();
  const { document, error } = useDocument("recipes", id);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [recipeError, setRecipeError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    if (document) {
      setIsPending(false);
      setRecipe(document);
    }
    if (error) {
      setRecipeError(error);
      setIsPending(false);
    }
  }, [document, error]);

  return (
    <div className={`recipe ${mode}`}>
      {recipeError && <p className="error"> {recipeError}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>{recipe.cookingTime} minutes to make</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p>{recipe.method}</p>
          {recipe.tags && (
            <ul>
              {recipe.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          {recipe.rating && <p>{recipe.rating} Stars</p>}
          <Link to={`/update/${id}`} className="brand">
            <p>Update</p>
          </Link>
        </>
      )}
    </div>
  );
}
