import React, { useState } from "react";
import { Link, useHistory, withRouter, Redirect } from "react-router-dom";
import { useAuth } from "../common/provider/AuthProvider";
import { PasswordResetPath, SignUpPath, HomePath } from "../routes";

export const SignInScreen = withRouter(() => {
  const history = useHistory();
  const { user, signInWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSignInError, setHasSignInError] = useState(false);

  if (user) return <Redirect to={HomePath} />;

  const handleSignIn = async () => {
    setLoading(true);
    setHasSignInError(false);

    try {
      await signInWithEmailAndPassword(email, password);
      setLoading(false);
      history.push(HomePath);
    } catch (e) {
      setHasSignInError(true);
      setLoading(false);
      return;
    }
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
        <Link to={PasswordResetPath}>パスワードをお忘れの方はこちら</Link>
      </div>
      ---
      <div>
        <Link to={SignUpPath}>登録していない方はこちら</Link>
      </div>
    </div>
  );
});
