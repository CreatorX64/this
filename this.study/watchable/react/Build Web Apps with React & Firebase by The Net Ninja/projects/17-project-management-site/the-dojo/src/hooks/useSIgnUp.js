import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  firebaseAuth,
  firebaseStorage,
  firebaseFirestore
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { doc, setDoc } from "firebase/firestore";

export function useSignUp() {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  async function signUp(email, password, displayName, avatar) {
    setError(null);
    setIsPending(true);

    try {
      // Sign up user
      const credential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!credential) {
        throw new Error("Could not sign up");
      }

      // Upload user avatar
      const uploadPath = `avatars/${credential.user.uid}/${avatar.name}`;
      const avatarRef = ref(firebaseStorage, uploadPath);
      await uploadBytes(avatarRef, avatar);
      const uploadedAvatarUrl = await getDownloadURL(avatarRef);

      // Add display name & avatar path to user
      await updateProfile(credential.user, {
        displayName,
        photoURL: uploadedAvatarUrl
      });

      // Create a user document
      await setDoc(doc(firebaseFirestore, "users", credential.user.uid), {
        online: true,
        displayName,
        photoURL: uploadedAvatarUrl
      });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: credential.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      console.log(err.message);

      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { isPending, error, signUp };
}
