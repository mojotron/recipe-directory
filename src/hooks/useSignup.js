import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, username) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) throw new Error("Could not create user account!");
      await updateProfile(res.user, { displayName: username });
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        console.error(error.message);
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, signup };
};
