import React from "react";
import { useAuth } from "../common/provider/AuthProvider";

export const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <div>
      <div>ホーム</div>
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
