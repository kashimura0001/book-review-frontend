import React, { useState } from "react";
import firebase from "../Firebase";
import { Link, withRouter } from "react-router-dom";
import { SignInPath } from "../routes";
import { Button } from "../components/atoms/Button";
import { TextBox } from "../components/atoms/TextBox";

export const PasswordResetScreen = withRouter((props) => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        props.history.push(SignInPath);
      })
      .catch(() => {
        alert("送信に失敗しました");
      });
  };

  return (
    <>
      <div>
        <TextBox onChange={(e) => setEmail(e.target.value)} placeholder="パスワードを入力..." />
      </div>
      <div>
        <Button theme="primary" onClick={onSubmit}>
          送信
        </Button>
      </div>
      <div>
        <Link to={SignInPath}>サインイン画面に戻る</Link>
      </div>
    </>
  );
});
