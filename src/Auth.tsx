import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "./common/provider/AuthProvider";

const FETCH_CURRENT_USER = gql`
  query fetchCurrentUser {
    currentUser {
      id
      email
      name
    }
  }
`;

export const Auth: FC<{ children: any }> = ({ children }) => {
  const { user } = useAuth();
  const { data, loading, error } = useQuery(FETCH_CURRENT_USER);

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error...</div>;
  if (!user) return <Redirect to="/signIn" />;
  if (user && data.currentUser) return children;
  if (user && !data.currentUser) return <Redirect to="/profile/register" />;
};
