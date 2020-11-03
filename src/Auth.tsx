import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./Firebase";
import { gql, useMutation } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignInUser {
    signInUser(input: {}) {
      user {
        id
        name
        email
      }
    }
  }
`;

export const Auth: FC<{ children: any }> = ({ children }) => {
  const [isCheckCompleted, setIsCheckCompleted] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRegisteredProfile, setIsRegisteredProfile] = useState(false);
  const [signIn] = useMutation(SIGN_IN);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setIsSignedIn(false);
        setIsCheckCompleted(true);
        return;
      }

      try {
        const result = await signIn();
        setIsSignedIn(true);
        setIsRegisteredProfile(!!result);
      } catch (e) {
        // TODO エラーである旨がわかるようにする
      }
      setIsCheckCompleted(true);
    });
  }, []);

  if (!isCheckCompleted) return <p>Loading...</p>;
  if (!isSignedIn) return <Redirect to="signin" />;
  if (isSignedIn && isRegisteredProfile) return children;
  if (isSignedIn && !isRegisteredProfile) return <Redirect to="/profile/register" />;
};
