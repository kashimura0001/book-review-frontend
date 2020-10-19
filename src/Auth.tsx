import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./Firebase";

export const Auth: FC<{ children: any }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (isSignedIn) {
    return children;
  } else {
    return <Redirect to="signin" />;
  }
};
