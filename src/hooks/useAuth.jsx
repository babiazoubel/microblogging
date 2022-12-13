import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup - deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //sign up
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes('password')) {
        systemErrorMessage = 'Password must be at least 6 characters long';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'Email already used';
      } else {
        systemErrorMessage =
          'Ops! Something went wrong. Please try again later.';
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //logout
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'User doesn&rsquot exist';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Wrong password';
      } else {
        systemErrorMessage =
          'Ops! Something went wrong. Please try again later.';
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  //deal with memory leak
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  //storage

  const storage = getStorage();

  const upload = async (file, user, setLoading) => {
    const fileRef = ref(storage, user.uid);

    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);

    const photoURL = await getDownloadURL(fileRef);

    updateProfile(user, {
      photoURL: photoURL,
    });

    setLoading(false);
    alert('Uploaded file!');
  };

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
    upload,
  };
};

export default useAuth;
