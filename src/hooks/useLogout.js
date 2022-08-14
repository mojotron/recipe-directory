import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true);
    setError(null);
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.error(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, logout };
};
