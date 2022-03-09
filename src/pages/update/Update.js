import "./Update.css";
import { useParams, useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useEffect, useState, useRef } from "react";

const Update = () => {
  const { id } = useParams();
  const history = useHistory();
  const ingredientInput = useRef(null);

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [newIngredient, setNewIngredient] = useState("");

  // const [title, setTitle] = useState("");
  // const [method, setMethod] = useState("");
  // const [cookingTime, setCookingTime] = useState("");
  // const [ingredients, setIngredients] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not locate recipe.");
        }
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // const doc = {
    //   title,
    //   ingredients,
    //   method,
    //   cookingTime: cookingTime + " minutes",
    // };

    projectFirestore.collection("recipes").doc(id).update(recipe);

    // try {
    //   await projectFirestore.collection("recipes").add(doc);
    //   history.push("/");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !recipe.ingredients.includes(ing)) {
      projectFirestore
        .collection("recipes")
        .doc(id)
        .update({
          ingredients: [...recipe.ingredients, ing],
        });
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  const handleRemove = (e) => {
    // e.preventDefault();
    // const ing = e.target.value;
    // projectFirestore.collection("recipes").doc(id).update({ingredients: FieldValue.arrayRemove(ing)})
  };

  return (
    <div className="update">
      {error && <p className="error"> {error}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && !isPending && (
        <div>
          <h2 className="page-title">Update</h2>
          <form onSubmit={handleSubmit}>
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

            <label>
              <div>
                Current Ingredients:{" "}
                {recipe.ingredients.map((i) => (
                  <label key={i}>
                    <button value={i} onClick={handleRemove}>
                      {i}
                    </button>
                  </label>
                ))}
              </div>
              <span>Recipe Ingredients</span>
              <div className="ingredients">
                <input
                  type="text"
                  onChange={(e) => setNewIngredient(e.target.value)}
                  value={newIngredient}
                  ref={ingredientInput} // allows us to use this element.
                />
                <button className="btn" onClick={handleAdd}>
                  Add
                </button>
              </div>
            </label>

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
            <label>
              <span>Cooking Time (minutes)</span>
              <input
                type="number"
                onChange={(e) =>
                  setRecipe({ ...recipe, cookingTime: e.target.value })
                }
                value={recipe.cookingTime}
                required
              />
            </label>
            {isSubmitted ? (
              <button className="button">Updating Recipe...</button>
            ) : (
              <button className="button">Submit</button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Update;
