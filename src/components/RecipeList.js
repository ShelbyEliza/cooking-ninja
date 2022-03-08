import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Trashcan from "../assets/delete-icon.svg";
import { projectFirestore } from "../firebase/config";

// styling:
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  if (recipes.length === 0) {
    return <div className="error">Sorry, no recipes found...</div>;
  }

  const handleDelete = (id) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook this!</Link>
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
