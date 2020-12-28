import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Auth } from "./Auth";
import { ProvideAuth } from "./common/provider/AuthProvider";

import {
  SignInPath,
  SignUpPath,
  PasswordResetPath,
  ProfilePath,
  ProfileNewPath,
  HomePath,
  ReviewsPath,
  ReviewDetailPath,
  ReviewNewPath,
  MembersPath,
  MemberDetailPath,
  SettingPath,
} from "./routes";
import { Navigation } from "./components/organisms/Navigation";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { PasswordResetScreen } from "./screens/PasswordResetScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ProfileCreateScreen } from "./screens/ProfileCreateScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ReviewsScreen } from "./screens/ReviewsScreen";
import { ReviewDetailScreen } from "./screens/ReviewDetailScreen";
import { ReviewCreateScreen } from "./screens/ReviewCreateScreen";
import { MembersScreen } from "./screens/MembersScreen";
import { MemberDetailScreen } from "./screens/MemberDetailScreen";
import { SettingScreen } from "./screens/SettingScreen";

export const App = () => {
  return (
    <ProvideAuth>
      <Switch>
        <Route exact path={SignInPath} component={SignInScreen} />
        <Route exact path={SignUpPath} component={SignUpScreen} />
        <Route exact path={PasswordResetPath} component={PasswordResetScreen} />
        <Route exact path={ProfileNewPath} component={ProfileCreateScreen} />
        <Auth>
          <Switch>
            <>
              <Navigation />
              <Route exact path={"/"}>
                <Redirect to={HomePath} />
              </Route>
              <Route exact path={HomePath} component={HomeScreen} />
              <Route exact path={ProfilePath} component={ProfileScreen} />
              <Route exact path={ReviewsPath} component={ReviewsScreen} />
              <Route exact path={ReviewDetailPath} component={ReviewDetailScreen} />
              <Route exact path={ReviewNewPath} component={ReviewCreateScreen} />
              <Route exact path={MembersPath} component={MembersScreen} />
              <Route exact path={MemberDetailPath} component={MemberDetailScreen} />
              <Route exact path={SettingPath} component={SettingScreen} />
            </>
          </Switch>
        </Auth>
      </Switch>
    </ProvideAuth>
  );
};
