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

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await createUser({ variables: { name: name, email: email } });
      await user?.sendEmailVerification();
      setLoading(false);
      history.push("/");
    } catch (e) {
      console.log(e);
      setLoading(false);
      // TODO: Firebaseに既に登録されていたらアカウント登録処理を行うようにする
      if (e.code === "auth/email-already-in-use") {
        alert("既に利用されているメールアドレスです。");
        return;
      }

      alert("登録に失敗しました。");
    }
  };

  return (
    <div>
      <div>新規登録</div>
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
