import { useEffect, useRef, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy
} from "firebase/firestore";
import { firebaseFirestore } from "../firebase/config";

export function useCollection(collectionName, _filter, _order) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // If we don't use a ref, there'll be infinite loop in useEffect, because
  // _filter is an array (reference type) and is different on every function call
  const filter = useRef(_filter).current;
  const order = useRef(_order).current;

  useEffect(() => {
    let collRef = collection(firebaseFirestore, collectionName);

    const constraints = [];
    if (filter) {
      constraints.push(where(...filter));
    }
    if (order) {
      constraints.push(orderBy(...order));
    }
    if (constraints.length > 0) {
      collRef = query(collRef, ...constraints);
    }

    const unsub = onSnapshot(
      collRef,
      (snapshot) => {
        const results = [];

        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError("Could not fetch data");
      }
    );

    return () => {
      unsub();
    };
  }, [collectionName, filter, order]);

  return { error, documents };
}
