// src/contexts/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../firebase/firebase.init';  // Assuming firebase is initialized here

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };


  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('User logged in:', currentUser);
        setUser(currentUser);
        setLoading(false);
      } else {
        console.log('No user logged in');
        setUser(null);
      }
    });

  
    return () => {
      unSubscribe();
    };
  }, []);

  
  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
