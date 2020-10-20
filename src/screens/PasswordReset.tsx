import React, { useState } from "react";
import firebase from "../Firebase";
import { Link, withRouter } from "react-router-dom";

export const PasswordReset = withRouter((props) => {
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        props.history.push("/signin");
      })
      .catch(() => {
        alert("送信に失敗しました");
      });
  };

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          送信
        </button>
      </div>
      <div>
        <Link to="/signin">サインイン画面に戻る</Link>
      </div>
    </>
  );
});
