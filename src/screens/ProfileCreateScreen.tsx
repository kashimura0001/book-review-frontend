import React, { useState } from "react";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../common/provider/AuthProvider";
import { SignInPath } from "../routes";
import { BoldText } from "../components/atoms/Text";
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

export const ProfileCreateScreen = withRouter(() => {
  const history = useHistory();
  const { user } = useAuth();
  const [createUser] = useMutation(CREATE_USER);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState("");

  if (!user) return <Redirect to={SignInPath} />;

  const handleRegisterProfile = async () => {
    setLoading(true);
    const email = user?.email;
    const token = await user?.getIdToken(true);
    try {
      await createUser({ variables: { token, name, email } });
      user?.sendEmailVerification();
      setLoading(false);
      history.push("/");
    } catch (e) {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <BoldText>基本データを登録</BoldText>
      {hasError && <BoldText>登録に失敗しました。</BoldText>}
      <div>
        <TextBox onChange={(e) => setName(e.target.value)} placeholder="名前を入力" />
      </div>
      <div>
        <TextBox value={user?.email || ""} disabled />
      </div>
      <Button theme="primary" onClick={handleRegisterProfile} disabled={loading}>
        {loading ? "loading..." : "登録"}
      </Button>
    </div>
  );
});
