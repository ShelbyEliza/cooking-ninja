import "./Update.css";
import { useParams, useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";

const Update = () => {
  const { recipeID } = useParams();
  const history = useHistory();
  const ingredientInput = useRef(null);
  const { updateDocument, response } = useFirestore("recipes");
  const { document, error } = useDocument("recipes", recipeID);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsPending(true);

    if (document) {
      setIsPending(false);
      setRecipe(document);
    } else {
      setUpdateError(error);
    }
  }, [document, error]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (!document.ingredients.includes(ing)) {
      await updateDocument(recipeID, {
        ingredients: [...document.ingredients, ing],
      });
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  const handleRemove = async (e, i) => {
    e.preventDefault();
    console.log(i);

    let newIngredients = "";
    const ing = i;

    newIngredients = document.ingredients.filter((i) => i !== ing);

    await updateDocument(recipeID, {
      ingredients: newIngredients,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    await updateDocument(recipeID, recipe);
  };
  console.log(recipe);

  return (
    <div>
      {updateError && <p className="error"> {updateError}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && !isPending && (
        <div className="update">
          <h2 className="page-title">Update</h2>
          <form onSubmit={handleSubmit}>
            <div className="title-time">
              <label>
                <span>Recipe Title</span>
                <input
                  type="text"
                  onChange={(e) => {
                    setRecipe({ ...recipe, title: e.target.value });
                  }}
                  value={recipe.title}
                  required
                />
              </label>

              <label className="cooking-time">
                <span>Time (minutes)</span>
                <input
                  type="text"
                  onChange={(e) =>
                    setRecipe({ ...recipe, cookingTime: e.target.value })
                  }
                  value={recipe.cookingTime}
                  required
                />
              </label>
            </div>

            <div className="ingredient-container">
              <label className="current-ing">
                <span>Current Ingredients: </span>
                <div className="current-ing-list">
                  {recipe.ingredients.map((i) => (
                    <div
                      className="remove-ing"
                      key={i}
                      value={i}
                      onClick={(e) => handleRemove(e, i)}
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </label>

              <label className="new-ing">
                <span>Recipe Ingredients</span>
                <input
                  type="text"
                  onChange={(e) => setNewIngredient(e.target.value)}
                  value={newIngredient}
                  ref={ingredientInput} // allows us to use this element.
                />
                <button className="btn add" onClick={handleAdd}>
                  Add
                </button>
              </label>
            </div>

            <label>
              <span>Recipe Method:</span>
              <textarea
                onChange={(e) =>
                  setRecipe({ ...recipe, method: e.target.value })
                }
                value={recipe.method}
                required
              />
            </label>

            {isSubmitted ? (
              <button className="btn add">Updating Recipe...</button>
            ) : (
              <button className="btn add">Submit</button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Update;
