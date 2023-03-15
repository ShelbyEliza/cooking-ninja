// styles:
import "./TagsRating.css";
import "./CreateUpdate.css";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../hooks/useFirestore";
import { useTheme } from "../../hooks/useTheme";
import Rating from "../../components/Rating";
import Tags from "../../components/Tags";

export default function Create() {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const { addRecipe } = useFirestore("recipes");

  const ingredientInput = useRef(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const doc = {
      title,
      ingredients,
      method,
      cookingTime,
      tags,
      rating,
      link,
    };

    addRecipe(doc);
  };

  useEffect(() => {
    if (isSubmitted) {
      navigate("/");
    }
  }, [isSubmitted, navigate]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  const removeAddedIng = (e) => {
    e.preventDefault();
    let ing = e.target.outerText;
    let ingTrimmed = ing.replace(",", "");
    let reducedIngredients = ingredients.filter((ing) => ing !== ingTrimmed);

    setIngredients(reducedIngredients);
  };
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleTags = (e) => {
    if (e.target.checked === true) {
      setTags([...tags, e.target.value]);
    } else {
      let reducedTags = tags.filter((tag) => tag !== e.target.value);
      setTags(reducedTags);
    }
  };

  return (
    <div className={`create card-${mode}`}>
      <h3 className="page-title">Add a New Recipe</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="title-time">
          <label>
            <span>Recipe Title</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>

          <label>
            <span>Time (mins)</span>
            <input
              type="number"
              onChange={(e) => setCookingTime(e.target.value)}
              value={cookingTime}
              required
            />
          </label>
        </div>

        <div className="ingredient-container"></div>
        <label>
          <span>Recipe Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn add">
              +
            </button>
          </div>
        </label>

        <div>
          Current Ingredients:{" "}
          <div className="current-ing-list">
            {ingredients.map((i) => (
              <em
                key={i}
                className="remove-ing"
                onClick={(e) => removeAddedIng(e)}
              >
                {/* {i},{" "} */}
                {i}
              </em>
            ))}
          </div>
        </div>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Link</span>
          <input
            type="text"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </label>
        <>
          <Tags handleTags={handleTags} tags />
        </>
        <>
          <Rating handleRating={handleRating} />
        </>
        {isSubmitted ? (
          <button className="btn submit-btn">Adding Recipe...</button>
        ) : (
          <button className="btn submit-btn">Submit</button>
        )}
      </form>
    </div>
  );
}
