import { useReducer, useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { firestore } from "../firebase/config";

const initialState = {
  isPending: false,
  document: null,
  success: null,
  error: null
};

const firestoreReducer = (state, action) => {
  // In the following cases, we don't include "...state" in returned objects
  // because in those cases, whe are resetting each state property anyway
  switch (action.type) {
    case "PENDING":
      return {
        isPending: true,
        document: null,
        success: false,
        error: null
      };
    case "ADD_DOC":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case "DELETE_DOC":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload
      };
    default:
      throw new Error("Unkown action type in firestoreReducer()");
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // Collection ref
  const collRef = collection(firestore, collectionName);

  // Only dispatch if not cancelled
  const dispatchSafe = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // Add a document
  const addDocument = async (doc) => {
    dispatch({ type: "PENDING" });

    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDoc = await addDoc(collRef, { ...doc, createdAt });
      dispatchSafe({ type: "ADD_DOC", payload: addedDoc });
    } catch (err) {
      dispatchSafe({ type: "ERROR", payload: err.message });
    }
  };

  // Delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "PENDING" });

    try {
      await deleteDoc(doc(firestore, collectionName, id));
      dispatchSafe({ type: "DELETE_DOC" });
    } catch (err) {
      dispatchSafe({ type: "ERROR", payload: "Could not delete" });
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { response, addDocument, deleteDocument };
};
