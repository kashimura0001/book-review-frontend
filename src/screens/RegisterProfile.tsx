import React, { useState } from "react";
import firebase from "../Firebase";
import { withRouter, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
      }
    }
  }
`;

export const RegisterProfile = withRouter(() => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [createUser] = useMutation(CREATE_USER);
  const [hasRegisterProfileError, setHasRegisterProfileError] = useState(false);

  const handleRegisterProfile = async () => {
    setHasRegisterProfileError(false);
    setLoading(true);
    const currentUser = firebase.auth().currentUser;
    try {
      await createUser({ variables: { name, email: currentUser?.email } });
      currentUser?.sendEmailVerification();
      setLoading(false);
      history.push("/");
    } catch (e) {
      setHasRegisterProfileError(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>基本データを登録</div>
      {hasRegisterProfileError && <div>登録に失敗しました。</div>}
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="名前を入力" />
      </div>
      <button type="submit" onClick={handleRegisterProfile} disabled={loading}>
        {loading ? "loading..." : "登録"}
      </button>
    </div>
  );
});
