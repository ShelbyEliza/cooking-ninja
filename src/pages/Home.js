import { useCollection } from "../hooks/useCollection";

// components:
import RecipeList from "../components/RecipeList";

export default function Home() {
  const { documents: recipes } = useCollection("recipes");

  return (
    <div className="home">
      {recipes &&
        (recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          <div>
            <p>No recipes to display.</p>
          </div>
        ))}
    </div>
  );
}
