import React, { useState } from "react";
import styles from "./SignUpScreen.module.scss";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../common/provider/AuthProvider";
import { SignInPath, HomePath, ProfileNewPath } from "../routes";
import { NormalText } from "../components/atoms/Text";
import { TextBox } from "../components/atoms/TextBox";
import { Button } from "../components/atoms/Button";
import { TextButton } from "../components/atoms/TextButton";

export const SignUpScreen = withRouter(() => {
  const history = useHistory();
  const { user, signUpWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (user) return <Redirect to={HomePath} />;

  const handleCreateUser = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      await signUpWithEmailAndPassword(email, password);
      history.push(ProfileNewPath);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setErrorMessage("既に登録されているメールアドレスです");
      } else if (e.code === "auth/invalid-email") {
        setErrorMessage("不正なメールアドレスです");
      } else {
        setErrorMessage("登録に失敗しました");
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <NormalText className={styles.title}>アカウント登録</NormalText>
        {errorMessage && (
          <NormalText className={styles.errorMessage} theme="danger">
            {errorMessage}
          </NormalText>
        )}
        <TextBox
          className={styles.emailInput}
          type="email"
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
          className={styles.subjectButton}
          theme="primary"
          onClick={handleCreateUser}
          disabled={loading || !(email && password)}
        >
          {loading ? "loading..." : "登録"}
        </Button>
        <TextButton className={styles.signInTextLink} theme="primary" onClick={() => history.push(SignInPath)}>
          サインインはこちら
        </TextButton>
      </div>
    </div>
  );
});
