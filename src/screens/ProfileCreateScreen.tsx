import React, { useState } from "react";
import styles from "./ProfileCreateScreen.module.scss";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAuth } from "../common/provider/AuthProvider";
import { HomePath, SignInPath } from "../routes";
import { NormalText } from "../components/atoms/Text";
import { TextBox } from "../components/atoms/TextBox";
import { Button } from "../components/atoms/Button";

const CREATE_USER = gql`
  mutation createUser($token: String!, $name: String!, $email: String!) {
    createUser(input: { token: $token, name: $name, email: $email }) {
      user {
        id
      }
    }
  }
`;

const FETCH_CURRENT_USER = gql`
  query fetchCurrentUser {
    currentUser {
      id
      email
      name
    }
  }
`;

export const ProfileCreateScreen = withRouter(() => {
  const history = useHistory();
  const { user } = useAuth();
  const [createUser] = useMutation(CREATE_USER);
  const { data, loading } = useQuery(FETCH_CURRENT_USER);
  const [name, setName] = useState("");
  const [registering, setRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO loading画面を表示する か ローデシングが不要になるようにルーティングの実装を見直す
  if (loading) return <div>loading...</div>;
  if (!user) return <Redirect to={SignInPath} />;
  if (data.currentUser) return <Redirect to={HomePath} />;

  const handleRegisterProfile = async () => {
    setRegistering(true);
    const email = user?.email;
    const token = await user?.getIdToken(true);
    try {
      await createUser({ variables: { token, name, email } });
      user?.sendEmailVerification();
      history.push(HomePath);
    } catch (e) {
      setErrorMessage("登録に失敗しました");
      setRegistering(false);
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
        <TextBox className={styles.nameInput} onChange={(e) => setName(e.target.value)} placeholder="名前を入力" />
        <TextBox className={styles.emailInput} value={user?.email || ""} disabled />
        <Button
          className={styles.subjectButton}
          theme="primary"
          onClick={handleRegisterProfile}
          disabled={registering || !name}
        >
          {registering ? "loading..." : "登録"}
        </Button>
      </div>
    </div>
  );
});
