import React, { useEffect, useState } from "react";
import firebase from "../Firebase";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation signUp($token: String!, $name: String!, $email: String!) {
    signUp(input: { token: $token, name: $name, email: $email }) {
      user {
        id
      }
    }
  }
`;

export const RegisterProfile = withRouter(() => {
  const history = useHistory();
  const [signUp] = useMutation(SIGN_UP);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const [name, setName] = useState("");
  const [hasRegisterProfileError, setHasRegisterProfileError] = useState(false);

  useEffect(() => {
    setHasFetchedUser(false);
    return firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setHasFetchedUser(true);
    });
  }, []);

  const handleRegisterProfile = async () => {
    setHasRegisterProfileError(false);
    setLoading(true);
    const email = currentUser?.email;
    const token = await currentUser?.getIdToken(true);
    try {
      await signUp({ variables: { token, name, email } });
      currentUser?.sendEmailVerification();
      setLoading(false);
      history.push("/");
    } catch (e) {
      setHasRegisterProfileError(true);
      setLoading(false);
    }
  };

  if (!hasFetchedUser) return <div>loading...</div>;
  if (!currentUser) return <Redirect to="/signIn" />;

  return (
    <div>
      <div>基本データを登録</div>
      {hasRegisterProfileError && <div>登録に失敗しました。</div>}
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="名前を入力" />
      </div>
      <div>
        <input type="text" value={currentUser?.email || ""} disabled />
      </div>
      <button type="button" onClick={handleRegisterProfile} disabled={loading}>
        {loading ? "loading..." : "登録"}
      </button>
    </div>
  );
});
