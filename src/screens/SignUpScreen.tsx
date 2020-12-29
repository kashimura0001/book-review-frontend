import React, { useState } from "react";
import { Link, withRouter, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../common/provider/AuthProvider";
import { SignInPath, HomePath, ProfileNewPath } from "../routes";
import { BoldText } from "../components/atoms/Text";
import { TextBox } from "../components/atoms/TextBox";
import { Button } from "../components/atoms/Button";

export const SignUpScreen = withRouter(() => {
  const history = useHistory();
  const { user, signUpWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasEmailAlreadyInUseError, setHasEmailAlreadyInUseError] = useState(false);
  const [hasInvalidEmailError, setHasInvalidEmailError] = useState(false);
  const [hasSignUpError, setHasSignUpError] = useState(false);

  if (user) return <Redirect to={HomePath} />;

  const resetErrorStatuses = () => {
    setHasEmailAlreadyInUseError(false);
    setHasInvalidEmailError(false);
    setHasSignUpError(false);
  };

  const handleCreateUser = async () => {
    resetErrorStatuses();
    setLoading(true);

    try {
      await signUpWithEmailAndPassword(email, password);
      history.push(ProfileNewPath);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") setHasEmailAlreadyInUseError(true);
      if (e.code === "auth/invalid-email") setHasInvalidEmailError(true);
      setHasSignUpError(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <BoldText>SignUp</BoldText>
      {hasSignUpError && <BoldText>登録に失敗しました。</BoldText>}
      {hasEmailAlreadyInUseError && <BoldText>既に登録されているメールアドレスです。</BoldText>}
      {hasInvalidEmailError && <BoldText>不正なメールアドレスです。</BoldText>}
      <div>
        <TextBox type="email" onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレスを入力" />
      </div>
      <div>
        <TextBox type="password" onChange={(e) => setPassword(e.target.value)} placeholder="パスワードを入力" />
      </div>
      <div>
        <Button theme="primary" onClick={handleCreateUser} disabled={loading}>
          {loading ? "loading..." : "新規登録"}
        </Button>
      </div>
      ---
      <div>
        <Link to={SignInPath}>サインインはこちら</Link>
      </div>
    </div>
  );
});
