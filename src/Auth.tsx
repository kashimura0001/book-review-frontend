import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./Firebase";
import { gql, useMutation } from "@apollo/client";

const SIGN_IN = gql`
  mutation signInUser {
    signInUser(input: {}) {
      user {
        id
      }
    }
  }
`;

export const Auth: FC<{ children: any }> = ({ children }) => {
  const [signIn] = useMutation(SIGN_IN);
  const [loading, setLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const [isProfileRegistered, setIsProfileRegistered] = useState(false);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setHasUser(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      setHasUser(true);
      await signIn()
        .then(({ data }) => setIsProfileRegistered(!!data.signInUser.user))
        .catch((error) => console.log(error));
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!hasUser) return <Redirect to="signIn" />;
  if (hasUser && isProfileRegistered) return children;
  if (hasUser && !isProfileRegistered) return <Redirect to="/profile/register" />;
};
