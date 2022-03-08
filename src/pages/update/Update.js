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

  // const [title, setTitle] = useState("");
  // const [method, setMethod] = useState("");
  // const [cookingTime, setCookingTime] = useState("");
  // const [newIngredient, setNewIngredient] = useState("");
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

  // const handleAdd = (e) => {
  //   e.preventDefault();
  //   const ing = newIngredient.trim();

  //   if (ing && !ingredients.includes(ing)) {
  //     setIngredients((prevIngredients) => [...prevIngredients, ing]);
  //   }
  //   setNewIngredient("");
  //   ingredientInput.current.focus();
  // };

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
                  console.log(recipe);
                }}
                value={recipe.title}
                required
              />
            </label>
            {/* <label>
          <span>Recipe Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })}
              value={recipe.ingredients}
              ref={ingredientInput} // allows us to use this element.
            />
            <button onClick={handleAdd} className="btn">
              Add
            </button>
          </div>
        </label>

        <p>
          Current Ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p> */}

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
