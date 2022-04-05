import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseFirestore } from "../firebase/config";

export function useDocument(collectionName, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(firebaseFirestore, collectionName, id);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("Document doesn't exist");
        }
      },
      (error) => {
        console.log(error.message);
        setError("Failed to get document");
      }
    );

    return () => {
      unsub();
    };
  }, [collectionName, id]);

  return { error, document };
}
