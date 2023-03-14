import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// firebase imports:
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .then((res) => {
        if (!error) {
          setIsPending(false);
        }
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };
  const sendVerificationEmail = async () => {
    await sendEmailVerification(auth.currentUser).catch((err) => {
      setError(err.message);
    });
    // .then(() => {
    // email verification sent
    // redirect to temp page until email is verified
    if (!error) {
      return "Message sent! Please check your email to verify your account!";
    } else {
      return error;
    }
    // });
  };

  return { login, sendVerificationEmail, isPending, error };
};
