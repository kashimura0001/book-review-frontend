import React, { useState } from "react";
import styles from "./SignInScreen.module.scss";
import { useHistory, withRouter, Redirect } from "react-router-dom";
import { useAuth } from "../common/provider/AuthProvider";
import { PasswordResetPath, SignUpPath, HomePath } from "../routes";
import { NormalText } from "../components/atoms/Text";
import { TextBox } from "../components/atoms/TextBox";
import { Button } from "../components/atoms/Button";
import { TextButton } from "../components/atoms/TextButton";

export const SignInScreen = withRouter(() => {
  const history = useHistory();
  const { user, signInWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (user) return <Redirect to={HomePath} />;

  const handleSignIn = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await signInWithEmailAndPassword(email, password);
      setLoading(false);
      history.push(HomePath);
    } catch (e) {
      setErrorMessage("サインインに失敗しました");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <NormalText className={styles.title}>サインイン</NormalText>
        {errorMessage && (
          <NormalText className={styles.errorMessage} theme="danger">
            {errorMessage}
          </NormalText>
        )}
        <TextBox
          className={styles.emailInput}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力..."
        />
        <TextBox
          className={styles.passwordInput}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力..."
        />
        <Button
          className={styles.signInButton}
          theme="primary"
          onClick={handleSignIn}
          disabled={loading || !(email && password)}
        >
          {loading ? "loading..." : "サインイン"}
        </Button>
        <TextButton
          className={styles.passwordResetPageLink}
          theme="primary"
          onClick={() => history.push(PasswordResetPath)}
        >
          パスワードをお忘れの方はこちら
        </TextButton>
        <TextButton className={styles.signUpPageLink} theme="primary" onClick={() => history.push(SignUpPath)}>
          未登録の方はこちら
        </TextButton>
      </div>
    </div>
  );
});
