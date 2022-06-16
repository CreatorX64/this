import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";

import { fbFirestore } from "lib/firebase";

const useCollection = (collectionName, _whereQuery) => {
  const [documents, setDocuments] = useState(null);

  const whereQuery = useRef(_whereQuery).current;

  useEffect(() => {
    let collRef = collection(fbFirestore, collectionName);

    if (whereQuery) {
      collRef = query(collRef, where(...whereQuery));
    }

    const unsub = onSnapshot(collRef, (snapshot) => {
      setDocuments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
      );
    });

    return () => unsub();
  }, [collectionName, whereQuery]);

  return { documents };
};

export default useCollection;
