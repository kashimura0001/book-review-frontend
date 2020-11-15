import React, { useState } from "react";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../common/provider/AuthProvider";

const CREATE_USER = gql`
  mutation createUser($token: String!, $name: String!, $email: String!) {
    createUser(input: { token: $token, name: $name, email: $email }) {
      user {
        id
      }
    }
  }
`;

export const RegisterProfile = withRouter(() => {
  const history = useHistory();
  const { user } = useAuth();
  const [createUser] = useMutation(CREATE_USER);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState("");

  if (!user) return <Redirect to="/signIn" />;

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
      <div>基本データを登録</div>
      {hasError && <div>登録に失敗しました。</div>}
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="名前を入力" />
      </div>
      <div>
        <input type="text" value={user?.email || ""} disabled />
      </div>
      <button type="button" onClick={handleRegisterProfile} disabled={loading}>
        {loading ? "loading..." : "登録"}
      </button>
    </div>
  );
});
