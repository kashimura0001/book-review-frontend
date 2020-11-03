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
  const [isRegisteredProfile, setIsRegisteredProfile] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user));
    const { error, data } = useQuery(GET_CURRENT_USER);
    setIsRegisteredProfile(!!data);
    setIsCheckCompleted(true);
  }, []);

  if (!isCheckCompleted) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    return <Redirect to="signin" />;
  }

  if (isRegisteredProfile) {
    return children;
  } else {
    return <Redirect to="/profile/register" />;
  }
};
