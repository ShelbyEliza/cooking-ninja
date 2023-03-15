import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

import { collection, doc, onSnapshot } from "firebase/firestore";

export const useDocument = (coll, id) => {
  const { user } = useAuthContext();
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // TO DO: changes will break how all pages use this hook

  // realtime data for document:
  useEffect(() => {
    let usersDoc = doc(db, "users", user.uid);
    let collRef = collection(usersDoc, coll);
    let docRef = doc(collRef, id);

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document exists.");
        }
      },
      (err) => {
        console.log(err.message);
        setError("Failed to get document.");
      }
    );

    return () => unsubscribe();
  }, [coll, id, user.uid]);

  return { document, error };
};
