import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./Firebase";
import { gql, useQuery } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      name
    }
  }
`;

export const Auth: FC<{ children: any }> = ({ children }) => {
  const [isCheckCompleted, setIsCheckCompleted] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { loading, data, refetch } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setIsSignedIn(true);
        await refetch();
      } else {
        setIsSignedIn(false);
      }
      setIsCheckCompleted(true);
    });
  }, []);

  if (!isCheckCompleted || loading) return <p>Loading...</p>;
  if (!isSignedIn) return <Redirect to="signin" />;
  if (isSignedIn && data?.currentUser) return children;
  if (isSignedIn && !data?.currentUser) return <Redirect to="/profile/register" />;
};
