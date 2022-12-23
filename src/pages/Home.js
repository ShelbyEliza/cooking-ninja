import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";

// components:
import RecipeList from "../components/RecipeList";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  // runs once initially:
  useEffect(() => {
    setIsPending(true);

    // async - fetches a snapshot of data initially.
    // realtime collection data fires function whenever data in function changes.
    // don't use catch for errors, use onSnapshot's second argument.
    // needs a clean up function to unsubscribe from this listener
    // for example, when page is directed away from.
    // once component unmounts unsub returns and stops listening.
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load.");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
