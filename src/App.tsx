import React from "react";
import styles from "./App.module.scss";
import { Switch, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { Auth } from "./Auth";

export const App = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Auth>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route render={() => <p>not found.</p>} />
        </Switch>
      </Auth>
    </Switch>
  );
};
