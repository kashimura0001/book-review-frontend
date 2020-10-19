import React from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

export const Home = () => {
  const handleSignOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      <div>ホーム</div>
      <div>
        <Link to="/profile">Profileへ</Link>
      </div>
      <button onClick={handleSignOut}>サインアウト</button>
    </div>
  );
};
