import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (col) => {
  const [documents, setDocuments] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    let unSub;
    const getDocuments = async () => {
      try {
        let ref = collection(db, col);
        unSub = onSnapshot(ref, (snapshot) => {
          const results = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setIsPending(false);
          setError(null);
          setDocuments(results);
        });
      } catch (error) {
        setIsPending(false);
        setError(error);
      }
    };

    getDocuments();
    return () => unSub();
  }, [col]);

  return { documents, isPending, error };
};
