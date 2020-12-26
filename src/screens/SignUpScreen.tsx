import React, { useState } from "react";
import { Link, withRouter, useHistory, Redirect } from "react-router-dom";
import { useAuth } from "../common/provider/AuthProvider";

export const SignUpScreen = withRouter(() => {
  const history = useHistory();
  const { user, signUpWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasEmailAlreadyInUseError, setHasEmailAlreadyInUseError] = useState(false);
  const [hasInvalidEmailError, setHasInvalidEmailError] = useState(false);
  const [hasSignUpError, setHasSignUpError] = useState(false);

  if (user) return <Redirect to="/" />;

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
      history.push("/profile/register");
    } catch (e) {
      if (e.code === "auth/email-already-in-use") setHasEmailAlreadyInUseError(true);
      if (e.code === "auth/invalid-email") setHasInvalidEmailError(true);
      setHasSignUpError(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>SignUp</div>
      {hasSignUpError && <div>登録に失敗しました。</div>}
      {hasEmailAlreadyInUseError && <div>既に登録されているメールアドレスです。</div>}
      {hasInvalidEmailError && <div>不正なメールアドレスです。</div>}
      <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="メールアドレスを入力" />
      </div>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="パスワードを入力" />
      </div>
      <div>
        <button type="submit" onClick={handleCreateUser} disabled={loading}>
          {loading ? "loading..." : "新規登録"}
        </button>
      </div>
      ---
      <div>
        <Link to="/signin">サインインはこちら</Link>
      </div>
    </div>
  );
});
