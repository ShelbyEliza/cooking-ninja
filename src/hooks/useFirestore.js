import { useReducer, useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/config";

// firebase imports:
import {
  collection,
  doc,
  Timestamp,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "UPDATE_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (coll) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const { user } = useAuthContext();
  const usersDoc = doc(db, "users", user.uid);

  // collection ref
  const ref = collection(usersDoc, coll);

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const createDateNow = async () => {
    dispatch({ type: "IS_PENDING" });
    return Timestamp.now();
  };
  // add a document
  const addRecipe = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = await createDateNow();
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteRecipe = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(ref, id));
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  // update documents:
  const updateRecipe = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const updatedRecipe = await updateDoc(doc(ref, id), updates);

      dispatchIfNotCancelled({
        type: "UPDATE_DOCUMENT",
        payload: updatedRecipe,
      });
      return updatedRecipe;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      return null;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addRecipe, deleteRecipe, updateRecipe, response };
};
