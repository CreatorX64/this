import { useEffect, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";

import { fbFirestore } from "lib/firebase";

const useCollection = (collectionName, _whereClause, _orderByClause) => {
  const [documents, setDocuments] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // queryClause is an array with 3 items (see Home.js). Which means for each
  // render, the passed in array will be re-created and this will cause the
  // useEffect below to run, which will update the "documents" state, which
  // will cause the component using this hook to re-render, which will in
  // turn evaluate a new array again even though the array items are the
  // same (as array is a reference type). That's why we wrap the _queryClause
  // with useRef so that we keep the same reference to the array throughout
  // the component lifecycle. If we don't use a ref ==> infinite loop in
  // useEffect. _queryClause is an array and is different on every function call.
  const whereClause = useRef(_whereClause).current;
  const orderByClause = useRef(_orderByClause).current;

  useEffect(() => {
    let collectionRef = collection(fbFirestore, collectionName);
    const queryClauses = [];

    if (whereClause) {
      queryClauses.push(where(...whereClause));
    }
    if (orderByClause) {
      queryClauses.push(orderBy(...orderByClause));
    }
    if (queryClauses.length > 0) {
      collectionRef = query(collectionRef, ...queryClauses);
    }

    const unsub = onSnapshot(
      collectionRef,
      (snapshot) => {
        setDocuments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }))
        );
        setErrorMessage(null);
      },
      (error) => {
        console.log(error);
        setErrorMessage("Could not fetch the data");
      }
    );

    return () => unsub();
  }, [collectionName, whereClause, orderByClause]);

  return { documents, errorMessage };
};

export default useCollection;
