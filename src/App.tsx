import React from "react";
import { Switch, Route } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { Auth } from "./Auth";
import { PasswordResetScreen } from "./screens/PasswordResetScreen";
import { RegisterProfileScreen } from "./screens/RegisterProfileScreen";
import { ProvideAuth } from "./common/provider/AuthProvider";

export const App = () => {
  return (
    <ProvideAuth>
      <Switch>
        <Route exact path="/signin" component={SignInScreen} />
        <Route exact path="/signup" component={SignUpScreen} />
        <Route exact path="/password/reset" component={PasswordResetScreen} />
        <Route exact path="/profile/register" component={RegisterProfileScreen} />
        <Auth>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route render={() => <p>not found.</p>} />
          </Switch>
        </Auth>
      </Switch>
    </ProvideAuth>
  );
};
