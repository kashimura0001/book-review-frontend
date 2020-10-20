import React from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

export const Home = () => {
  const user = firebase.auth().currentUser;

  const signOut = () => {
    firebase.auth().signOut();
  };

  const sendEmailVerification = () => {
    user
      ?.sendEmailVerification()
      .then(() => {
        alert("送信しました");
      })
      .catch((error) => {
        console.log(error);
        alert("送信に失敗しました");
      });
  };

  return (
    <div>
      {!user?.emailVerified && (
        <div>
          {`${user?.email}宛に認証メールを送信しました。`}
          <span onClick={sendEmailVerification}>再送する</span>
        </div>
      )}
      <div>ホーム</div>
      <div>
        <Link to="/profile">Profileへ</Link>
      </div>
      <button onClick={signOut}>サインアウト</button>
    </div>
  );
};
