import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useFirestore } from "../../hooks/useFirestore";
import Trashcan from "../../assets/delete-icon.svg";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

// styles:
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();
  const { document, error } = useDocument("recipes", id);
  const { deleteDocument, response } = useFirestore("recipes");
  const history = useHistory();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [recipeError, setRecipeError] = useState(false);

  useEffect(() => {
    if (response.success) {
      history.push("/");
    }
  }, [response.success, history]);

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

  const handleDelete = (id) => {
    setIsPending(true);
    deleteDocument(id);

    if (response.success) {
      history.push("/");
    }
  };

  return (
    <div className={`recipe ${mode}`}>
      {recipeError && <p className="error"> {recipeError}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && (
        <>
          <img
            className="delete"
            src={Trashcan}
            alt="A trashcan, which deletes this recipe."
            onClick={() => handleDelete(id)}
          />
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
