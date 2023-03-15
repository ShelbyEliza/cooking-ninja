import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// hooks:
import { useDocument } from "../../hooks/useDocument";
import { useFirestore } from "../../hooks/useFirestore";
import { useTheme } from "../../hooks/useTheme";

// styles & assets:
import "./Recipe.css";
import Trashcan from "../../assets/delete-icon.svg";

export default function Recipe() {
  const { id } = useParams();
  const { mode, color } = useTheme();
  const { document, error } = useDocument("recipes", id);
  const { deleteRecipe, response } = useFirestore("recipes");
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [recipeError, setRecipeError] = useState(false);

  useEffect(() => {
    if (response.success) {
      navigate("/");
    }
  }, [response.success, navigate]);

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
    deleteRecipe(id);
    setIsPending(true);
  };

  return (
    <div className={`recipe card-${mode}`}>
      {recipeError && <p className="error"> {recipeError}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && !isPending && (
        <div>
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
        </div>
      )}
    </div>
  );
}
