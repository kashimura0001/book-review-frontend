import React, { useState } from "react";
import styles from "./PasswordResetScreen.module.scss";
import firebase from "../Firebase";
import { useHistory, withRouter } from "react-router-dom";
import { SignInPath } from "../routes";
import { Button } from "../components/atoms/Button";
import { TextBox } from "../components/atoms/TextBox";
import { TextButton } from "../components/atoms/TextButton";
import { NormalText } from "../components/atoms/Text";

export const PasswordResetScreen = withRouter(() => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      history.push(SignInPath);
    } catch (e) {
      setErrorMessage("送信に失敗しました");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <NormalText className={styles.title}>パスワード再設定</NormalText>
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
        <Button className={styles.subjectButton} theme="primary" onClick={onSubmit} disabled={loading || !email}>
          送信
        </Button>
        <TextButton className={styles.signInPageLink} theme="primary" onClick={() => history.push(SignInPath)}>
          サインイン画面に戻る
        </TextButton>
      </div>
    </div>
  );
});
