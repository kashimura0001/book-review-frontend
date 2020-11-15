import React, { useEffect, useState } from "react";
import firebase from "../Firebase";
import { withRouter, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation signUp($token: String!, $name: String!, $email: String!) {
    signUp(input: { token: $token, name: $name, email: $email }) {
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
  const [signUp] = useMutation(SIGN_UP);
  const [hasRegisterProfileError, setHasRegisterProfileError] = useState(false);

  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => setUser(user));
  }, []);

  // TODO Firebase認証が完了していない場合はサインイン画面にリダイレクトする処理を追加する

  const handleRegisterProfile = async () => {
    setHasRegisterProfileError(false);
    setLoading(true);
    const email = user?.email;
    const token = await user?.getIdToken(true);
    try {
      await signUp({ variables: { token, name, email } });
      user?.sendEmailVerification();
      setLoading(false);
      history.push("/");
    } catch (e) {
      console.log(e);
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
      <div>
        <input type="text" value={user?.email || ""} disabled />
      </div>
      <button type="button" onClick={handleRegisterProfile} disabled={loading}>
        {loading ? "loading..." : "登録"}
      </button>
    </div>
  );
});
