import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: false, error: null, success: false };
    case "ADD_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETE_DOCUMENT":
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };
    case "GET_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "UPDATE_DOCUMENT":
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      }
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = collection(db, collectionName);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADD_DOCUMENT", payload: addedDocument });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await deleteDoc(doc(db, collectionName, id));
      dispatchIfNotCancelled({ type: "DELETE_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  const getDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const docRef = doc(db, collectionName, id);
      const docSnapshot = await getDoc(docRef);
      dispatchIfNotCancelled({
        type: "GET_DOCUMENT",
        payload: { ...docSnapshot.data(), id: doc.id },
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  const updateDocument = async (id, data) => {
    dispatch({ type: "IS_PANDING" });
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...data });
      dispatchIfNotCancelled({ type: "UPDATE_DOCUMENT" })
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument, getDocument, updateDocument };
};
