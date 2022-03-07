import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";

// styles:
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const url = "http://localhost:3000/recipes/" + id;
  const { data: recipe, isPending, error } = useFetch(url);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, [error, history]);

  return (
    <div className="recipe">
      {isPending && <div className="loading">Loading...</div>}
      {error && (
        <div className="error">
          {error}
          <p>Redirecting to the Homepage...</p>
        </div>
      )}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to make.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p>{recipe.method}</p>
        </>
      )}
    </div>
  );
}
