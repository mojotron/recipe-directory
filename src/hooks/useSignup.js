import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email, password, username) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      if (!res) throw new Error("Could not create user account!");
      auth.currentUser.displayName = username;
      setError(null);
      setIsPending(false);
    } catch (error) {
      console.error(error.message);
      setIsPending(false);
      setError(error.message);
    }
  };

  return { isPending, error, signup };
};
