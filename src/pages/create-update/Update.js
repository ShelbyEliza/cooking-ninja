// styles:
import "./TagsRating.css";
import "./CreateUpdate.css";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// hooks & components:
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import { useTheme } from "../../hooks/useTheme";
import Tags from "../../components/Tags";
import Rating from "../../components/Rating";

const Update = () => {
  const { id } = useParams();
  const { mode } = useTheme();
  const navigate = useNavigate();
  const ingredientInput = useRef(null);
  const { updateRecipe } = useFirestore("recipes");
  const { document, error } = useDocument("recipes", id);

  const [isPending, setIsPending] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    setIsPending(true);

    if (document) {
      setIsPending(false);
      setRecipe(document);
    }
    if (error) {
      setUpdateError(error);
      setIsPending(false);
    }
  }, [document, error]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (!recipe.ingredients.includes(ing) && !(ing === "")) {
      setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ing] });
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  const handleRemove = async (e, i) => {
    e.preventDefault();

    let newIngredients = "";
    const ing = i;

    newIngredients = recipe.ingredients.filter((i) => i !== ing);

    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleRating = (selectedRating) => {
    setRecipe({ ...recipe, rating: selectedRating });
  };

  const handleTags = (e) => {
    if (e.target.checked === true) {
      if (recipe.tags) {
        setRecipe({ ...recipe, tags: [...recipe.tags, e.target.value] });
      } else {
        setRecipe({ ...recipe, tags: [e.target.value] });
      }
    } else {
      let reducedTags = recipe.tags.filter((tag) => tag !== e.target.value);
      setRecipe({ ...recipe, tags: reducedTags });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    await updateRecipe(id, recipe);
    setIsPending(false);
    navigate("/");
  };

  return (
    <div className={`update card-${mode}`}>
      {updateError && <p className="error"> {updateError}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && !isPending && (
        <div>
          <h3 className="page-title">Update Recipe</h3>
          <form id="update-form">
            <div className="title-time">
              <label htmlFor="recipe-title">
                <span>Recipe Title</span>
                <input
                  id="recipe-title"
                  type="text"
                  onChange={(e) => {
                    setRecipe({ ...recipe, title: e.target.value });
                  }}
                  value={recipe.title}
                  required
                />
              </label>

              <label htmlFor="cooking-time">
                <span>Time (mins)</span>
                <input
                  id="cooking-time"
                  type="number"
                  onChange={(e) =>
                    setRecipe({ ...recipe, cookingTime: e.target.value })
                  }
                  value={recipe.cookingTime}
                  required
                />
              </label>
            </div>

            <div className="ingredient-container">
              <label htmlFor="current-ing">Current Ingredients</label>
              <div className="current-ing-list">
                {recipe.ingredients.map((i) => (
                  <div
                    id="current-ing"
                    className="remove-ing"
                    key={i}
                    value={i}
                    onClick={(e) => handleRemove(e, i)}
                  >
                    {i}
                  </div>
                ))}
              </div>

              <label htmlFor="new-ing">
                <span>Recipe Ingredients</span>
                <div className="ingredients">
                  <input
                    id="new-ing"
                    type="text"
                    onChange={(e) => setNewIngredient(e.target.value)}
                    value={newIngredient}
                    ref={ingredientInput}
                  />
                  <button id="new-ing" className="btn add" onClick={handleAdd}>
                    +
                  </button>
                </div>
              </label>
            </div>

            <div>
              <label htmlFor="recipe-method">Recipe Method</label>
              <textarea
                id="recipe-method"
                onChange={(e) =>
                  setRecipe({ ...recipe, method: e.target.value })
                }
                value={recipe.method}
                required
              />
            </div>

            <div>
              <label htmlFor="link">Link</label>
              <input
                id="link"
                onChange={(e) => setRecipe({ ...recipe, link: e.target.value })}
                value={recipe.link}
              />
            </div>

            <Tags handleTags={handleTags} tags={recipe.tags} />
            <Rating handleRating={handleRating} defaultRating={recipe.rating} />
          </form>

          {isPending ? (
            <button className="btn submit-btn" disabled>
              Updating Recipe...
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn submit-btn"
              form="update-form"
            >
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Update;
