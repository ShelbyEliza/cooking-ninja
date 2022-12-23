// styling:
import "./RecipeList.css";

import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Trashcan from "../assets/delete-icon.svg";
import { projectFirestore } from "../firebase/config";

export default function RecipeList({ recipes }) {
  const { mode, color } = useTheme();
  if (recipes.length === 0) {
    return <div className="error">Sorry, no recipes found...</div>;
  }

  const handleDelete = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card card-${mode}-${color.name}`}>
          <h3 className="card-title">{recipe.title}</h3>
          <p className="card-time">{recipe.cookingTime} minutes</p>
          <div className="card-method">
            {recipe.method.substring(0, 100)}...
          </div>
          <Link className="card-link" to={`/recipes/${recipe.id}`}>
            Cook this!
          </Link>
          <img
            className="delete"
            src={Trashcan}
            alt="A trashcan, which represents the delete this recipe button."
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
