import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import firebase from "../../Firebase";

type AuthContextType = {
  user: firebase.User | null;
  signInWithEmailAndPassword: (email: string, password: string) => void;
  signUpWithEmailAndPassword: (email: string, password: string) => void;
  signOut: () => void;
};

const authContext = createContext({} as AuthContextType);

export const ProvideAuth = ({ children }: { children: ReactNode }) => {
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setHasFetchedUser(true);
    });
  });

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    setUser(user);
  };

  const signUpWithEmailAndPassword = async (email: string, password: string) => {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    setUser(user);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  const useProvideAuth = {
    user,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    signOut,
  };

  if (!hasFetchedUser) return <div>loading...</div>;
  return <authContext.Provider value={useProvideAuth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
