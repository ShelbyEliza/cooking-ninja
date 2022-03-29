import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

// styles:
import "./Recipe.css";

export default function Recipe() {
  const { recipeID } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("recipes")
      .doc(recipeID)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not locate recipe.");
        }
      });

    return () => unsub();
  }, [recipeID]);

  // const handleUpdate = () => {
  //   projectFirestore.collection("recipes").doc(recipeID).update({
  //     title: "Something Completely Different",
  //   });
  // };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error"> {error}</p>}
      {isPending && <div className="loading">Loading...</div>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to make.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p>{recipe.method}</p>
          <Link to={`/update/${recipeID}`} className="brand">
            <p>Update</p>
          </Link>
          {/* <button onClick={handleUpdate}>Update Recipe</button> */}
        </>
      )}
    </div>
  );
}
