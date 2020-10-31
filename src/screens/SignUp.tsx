import React, { useState } from "react";
import firebase from "../Firebase";
import { Link, withRouter, useHistory } from "react-router-dom";
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

export const SignUp = withRouter(() => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, { data }] = useMutation(CREATE_USER);
  const [hasEmailAlreadyInUseError, setHasEmailAlreadyInUseError] = useState(false);
  const [hasInvalidEmailError, setHasInvalidEmailError] = useState(false);
  const [hasSignUpError, setHasSignUpError] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    setHasEmailAlreadyInUseError(false);
    setHasInvalidEmailError(false);
    setHasSignUpError(false);

    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        return user;
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") setHasEmailAlreadyInUseError(true);
        if (error.code === "auth/invalid-email") setHasInvalidEmailError(true);
        return null;
      });

    if (!user) {
      setHasSignUpError(true);
      setLoading(false);
      return;
    }

    await createUser({ variables: { name: name, email: email } })
      .then(() => {
        user.sendEmailVerification();
        setLoading(false);
        history.push("/");
      })
      .catch(() => {
        setHasSignUpError(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>新規登録</div>
      {hasSignUpError && <div>登録に失敗しました。</div>}
      {hasEmailAlreadyInUseError && <div>既に登録されているメールアドレスです。</div>}
      {hasInvalidEmailError && <div>不正なメールアドレスです。</div>}
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="名前を入力" />
      </div>
      <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレスを入力" />
      </div>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="パスワードを入力" />
      </div>
      <div>
        <button type="submit" onClick={handleCreateUser} disabled={loading}>
          {loading ? "loading..." : "新規登録"}
        </button>
      </div>
      ---
      <div>
        <Link to="/signin">サインインはこちら</Link>
      </div>
    </div>
  );
});
