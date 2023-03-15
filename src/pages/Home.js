import { useCollection } from "../hooks/useCollection";

import { useTheme } from "../hooks/useTheme";

// components:
import RecipeList from "../components/RecipeList";

export default function Home() {
  const { documents: recipes } = useCollection("recipes");
  const { mode } = useTheme();

  return (
    <div className="home">
      {recipes &&
        (recipes.length > 0 ? (
          <RecipeList recipes={recipes} />
        ) : (
          <div>
            <p className={`empty-list-${mode}`}>No recipes to display.</p>
          </div>
        ))}
    </div>
  );
}
