import React, { useState } from "react";
import firebase from "../Firebase";
import { Link, withRouter } from "react-router-dom";

export const SignIn = withRouter((props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSignInError, setHasSignInError] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    setHasSignInError(false);

    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        return user;
      })
      .catch(() => {
        return null;
      });

    if (!user) {
      setHasSignInError(true);
      setLoading(false);
      return;
    }

    // TODO DBに確認する処理を実装する
  };

  return (
    <div>
      <div>サインイン</div>
      {hasSignInError && <div>サインインに失敗しました。</div>}
      <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレスを入力" />
      </div>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="パスワードを入力" />
      </div>
      <div>
        <button type="submit" onClick={handleSignIn} disabled={loading}>
          {loading ? "loading..." : "サインイン"}
        </button>
      </div>
      ---
      <div>
        <Link to="/password/reset">パスワードをお忘れの方はこちら</Link>
      </div>
      ---
      <div>
        <Link to="/signup">登録していない方はこちら</Link>
      </div>
    </div>
  );
});
