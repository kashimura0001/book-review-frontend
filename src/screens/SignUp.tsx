import React, { useState } from "react";
import firebase from "../Firebase";
import { Link, withRouter } from "react-router-dom";

export const SignUp = withRouter((props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        user?.sendEmailVerification();
        setLoading(false);
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  return (
    <div>
      <div>新規登録</div>
      <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit} disabled={loading}>
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
