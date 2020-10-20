import React, { useState } from "react";
import firebase from "../Firebase";
import { Link, withRouter } from "react-router-dom";

export const SignIn = withRouter((props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
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
      <div>サインイン</div>
      <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "loading..." : "サインイン"}
        </button>
      </div>
      ---
      <div>
        <Link to="/signup">登録していない方はこちら</Link>
      </div>
    </div>
  );
});
