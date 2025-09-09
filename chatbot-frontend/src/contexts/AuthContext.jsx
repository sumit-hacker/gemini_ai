import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { saveUserProfile } from '../services/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userObj = {
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email,
          avatar: firebaseUser.photoURL || '/avatar.png',
          uid: firebaseUser.uid
        };
        setUser(userObj);
        saveUserProfile(userObj);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Email/password login
  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  // Email/password signup
  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user && name) {
        await res.user.updateProfile({ displayName: name });
      }
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  // Google sign-in
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (e) {
      alert(e.message);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
