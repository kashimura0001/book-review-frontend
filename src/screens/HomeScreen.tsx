import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../common/provider/AuthProvider";

export const HomeScreen = () => {
  const { user, signOut } = useAuth();

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
      <br />
      <br />
      <br />
      <br />
      <br />
      <button
        onClick={async () => {
          const idToken = await user?.getIdToken(true);
          console.log(idToken);
        }}
      >
        IDトークンを取得する
      </button>
    </div>
  );
};
