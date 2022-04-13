import "./Update.css";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import Tags from "../../components/Tags";
import Rating from "../../components/Rating";

const Update = () => {
  const { id } = useParams();
  const history = useHistory();
  const ingredientInput = useRef(null);
  const { updateDocument, response } = useFirestore("recipes");
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

  if (recipe) {
    console.log(recipe);
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    console.log(newIngredient);

    if (!recipe.ingredients.includes(ing) && !(ing === "")) {
      setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ing] });
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  const handleRemove = async (e, i) => {
    e.preventDefault();
    console.log(i);

    let newIngredients = "";
    const ing = i;

    newIngredients = recipe.ingredients.filter((i) => i !== ing);

    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleRating = (e) => {
    setRecipe({ ...recipe, rating: e.target.value });
    console.log(e.target.value);
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

    await updateDocument(id, recipe);
    setIsPending(false);
  };

  useEffect(() => {
    if (response.success) {
      history.push("/");
    }
  }, [response.success, history]);

  return (
    <div className="update">
      {updateError && <p className="error"> {updateError}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && !isPending && (
        <div>
          <h2 className="page-title">Update Recipe</h2>
          <form id="update-form">
            <div className="title-time">
              <div>
                <label htmlFor="recipe-title">Recipe Title</label>
                <input
                  id="recipe-title"
                  type="text"
                  onChange={(e) => {
                    setRecipe({ ...recipe, title: e.target.value });
                  }}
                  value={recipe.title}
                  required
                />
              </div>

              <div>
                <label htmlFor="cooking-time">Time (mins)</label>
                <input
                  id="cooking-time"
                  type="number"
                  onChange={(e) =>
                    setRecipe({ ...recipe, cookingTime: e.target.value })
                  }
                  value={recipe.cookingTime}
                  required
                />
              </div>
            </div>

            <div className="ingredient-container">
              <div>
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
              </div>

              <div>
                <label htmlFor="new-ing">Recipe Ingredients</label>
                <div className="new-ing">
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
              </div>
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
            <button className="btn" disabled>
              Updating Recipe...
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn" form="update-form">
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Update;
