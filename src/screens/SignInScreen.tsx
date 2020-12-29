import React, { useState } from "react";
import { Link, useHistory, withRouter, Redirect } from "react-router-dom";
import { useAuth } from "../common/provider/AuthProvider";
import { PasswordResetPath, SignUpPath, HomePath } from "../routes";
import { BoldText } from "../components/atoms/Text";
import { TextBox } from "../components/atoms/TextBox";
import { Button } from "../components/atoms/Button";

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
      <BoldText>サインイン</BoldText>
      {hasSignInError && <BoldText>サインインに失敗しました。</BoldText>}
      <div>
        <TextBox onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレスを入力" />
      </div>
      <div>
        <TextBox type="password" onChange={(e) => setPassword(e.target.value)} placeholder="パスワードを入力" />
      </div>
      <div>
        <Button theme="primary" onClick={handleSignIn} disabled={loading}>
          {loading ? "loading..." : "サインイン"}
        </Button>
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
