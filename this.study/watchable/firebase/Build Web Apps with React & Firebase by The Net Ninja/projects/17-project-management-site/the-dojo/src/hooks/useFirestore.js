import { useReducer, useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { firebaseFirestore } from "../firebase/config";

// Action types
export const PENDING = "PENDING";
export const ADD_DOC = "ADD_DOC";
export const DELETE_DOC = "DELETE_DOC";
export const UPDATE_DOC = "UPDATE_DOC";
export const ERROR = "ERROR";

const initialState = {
  isPending: false,
  document: null,
  success: null,
  error: null
};

function firestoreReducer(state, action) {
  // In the following cases, we don't include "...state" in returned objects
  // because in those cases, whe are resetting each state property anyway
  switch (action.type) {
    case PENDING:
      return {
        isPending: true,
        document: null,
        success: false,
        error: null
      };
    case ADD_DOC:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case DELETE_DOC:
      return {
        isPending: false,
        document: null,
        success: true,
        error: null
      };
    case UPDATE_DOC:
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      };
    case ERROR:
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload
      };
    default:
      throw new Error("Unkown action type in firestoreReducer()");
  }
}

export function useFirestore(collectionName) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // Collection ref
  const collRef = collection(firebaseFirestore, collectionName);

  // Only dispatch if not cancelled
  function dispatchSafe(action) {
    if (!isCancelled) {
      dispatch(action);
    }
  }

  // Add a document
  async function addDocument(doc) {
    dispatch({ type: PENDING });

    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDoc = await addDoc(collRef, { ...doc, createdAt });
      dispatchSafe({ type: ADD_DOC, payload: addedDoc });
    } catch (error) {
      dispatchSafe({ type: ERROR, payload: error.message });
    }
  }

  // Delete a document
  async function deleteDocument(id) {
    dispatch({ type: PENDING });

    try {
      await deleteDoc(doc(firebaseFirestore, collectionName, id));
      dispatchSafe({ type: DELETE_DOC });
    } catch (error) {
      dispatchSafe({ type: ERROR, payload: "Could not delete" });
    }
  }

  // Update a document
  async function updateDocument(id, updates) {
    dispatch({ type: PENDING });

    try {
      const updatedDocument = await updateDoc(
        doc(firebaseFirestore, collectionName, id),
        updates
      );
      dispatchSafe({ type: UPDATE_DOC, payload: updatedDocument });
    } catch (error) {
      dispatchSafe({ type: ERROR, payload: error.message });
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { response, addDocument, deleteDocument, updateDocument };
}
