import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firebaseFirestore } from "../firebase/config";

export function useCollection(collectionName, _filter) {
  const [documents, setDocuments] = useState(null);
  const filter = useRef(_filter).current;

  useEffect(() => {
    let collRef = collection(firebaseFirestore, collectionName);

    if (filter) {
      collRef = query(collRef, where(...filter));
    }

    const unsub = onSnapshot(
      collRef,
      (snapshot) => {
        const results = [];

        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
      },
      (error) => {}
    );

    return () => {
      unsub();
    };
  }, [collectionName, filter]);

  return { documents };
}
