import { useReducer, useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";

import { fbFirestore } from "lib/firebase";

const initialState = {
  document: null,
  isPending: false,
  errorMessage: null,
  isSuccess: false
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "START_PENDING":
      return {
        isPending: true,
        document: null,
        isSuccess: false,
        errorMessage: null
      };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        isSuccess: true,
        errorMessage: null
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        isSuccess: true,
        errorMessage: null
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        isSuccess: false,
        errorMessage: action.payload
      };
    default:
      throw new Error(
        `Unknown action type in firestoreReducer(): ${action.type}`
      );
  }
};

const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const collectionRef = collection(fbFirestore, collectionName);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (objToAdd) => {
    dispatch({ type: "START_PENDING" });

    try {
      const createdAt = Timestamp.fromDate(new Date());
      const newDoc = await addDoc(collectionRef, { ...objToAdd, createdAt });

      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: newDoc });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "START_PENDING" });

    try {
      await deleteDoc(doc(fbFirestore, collectionName, id));

      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};

export default useFirestore;
