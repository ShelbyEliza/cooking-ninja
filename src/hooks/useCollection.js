import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

// firebase imports:
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const useCollection = (coll, _q, _oB) => {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // TO DO: changes will break how all pages use this hook

  const q = useRef(_q).current;
  const oB = useRef(_oB).current;

  useEffect(() => {
    let ref = doc(db, "users", user.uid);
    ref = collection(ref, coll);

    if (q) {
      ref = query(ref, where(...q));
    }
    if (oB) {
      ref = orderBy(ref, where(...oB));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data.");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [coll, q, oB, user.uid]);

  return { documents, error };
};
