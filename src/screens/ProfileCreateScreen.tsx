import React, { useState } from "react";
import styles from "./ProfileCreateScreen.module.scss";
import { withRouter, useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../common/provider/AuthProvider";
import { HomePath, SignInPath } from "../routes";
import { NormalText } from "../components/atoms/Text";
import { TextBox } from "../components/atoms/TextBox";
import { Button } from "../components/atoms/Button";
import { TextButton } from "../components/atoms/TextButton";

const CREATE_USER = gql`
  mutation createUser($token: String!, $name: String!, $email: String!) {
    createUser(input: { token: $token, name: $name, email: $email }) {
      user {
        id
      }
    }
  }
`;

export const ProfileCreateScreen = withRouter(() => {
  const history = useHistory();
  const { user } = useAuth();
  const [createUser] = useMutation(CREATE_USER);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegisterProfile = async () => {
    setLoading(true);
    const email = user?.email;
    const token = await user?.getIdToken(true);
    try {
      await createUser({ variables: { token, name, email } });
      user?.sendEmailVerification();
      history.push(HomePath);
    } catch (e) {
      setErrorMessage("登録に失敗しました");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <NormalText className={styles.title}>プロフィール登録</NormalText>
        {errorMessage && (
          <NormalText className={styles.errorMessage} theme="danger">
            {errorMessage}
          </NormalText>
        )}
        <TextBox className={styles.nameInput} onChange={(e) => setName(e.target.value)} placeholder="名前を入力..." />
        <TextBox className={styles.emailInput} value={user?.email || ""} disabled placeholder="メールアドレス" />
        <Button
          className={styles.subjectButton}
          theme="primary"
          onClick={handleRegisterProfile}
          disabled={loading || !(name && user?.email)}
        >
          {loading ? "loading..." : "登録"}
        </Button>
        <TextButton className={styles.signInPageLink} theme="primary" onClick={() => history.push(SignInPath)}>
          サインインに戻る
        </TextButton>
      </div>
    </div>
  );
});
