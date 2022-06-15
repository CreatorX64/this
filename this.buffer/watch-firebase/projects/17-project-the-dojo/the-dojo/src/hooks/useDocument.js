import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { fbFirestore } from "lib/firebase";

const useDocument = (collectionName, docId) => {
  const [document, setDocument] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Realtime data for document
  useEffect(() => {
    const docRef = doc(fbFirestore, collectionName, docId);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setErrorMessage(null);
        } else {
          setErrorMessage("Document not found");
        }
      },
      (error) => {
        console.log(error.message);
        setErrorMessage("Failed to get document");
      }
    );

    return () => unsub();
  }, [collectionName, docId]);

  return { document, errorMessage };
};

export default useDocument;
