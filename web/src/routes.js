import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import AppContainer from './containers/application';
import HomeContainer from './containers/home';
import SigninContainer from './containers/signin';
import SignupContainer from './containers/signup';
import DashboardContainer from './containers/dashboard';
import SuccessContainer from './containers/success';
import TokenContainer from './containers/token';

export const makeRoutes = (store) => {
  function authenticate(state, replace, next) {
    const { me } = store.getState();
    if (!me.isAuthenticated) {
      replace('/signin');
    }

    next();
  }

  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path="go/:uid/:token" component={TokenContainer} />
      <Route path="signin" component={SigninContainer} />
      <Route path="/signout" component={HomeContainer} />
      <Route path="signup" component={SignupContainer} />
      <Route path="success" component={SuccessContainer} />
      <Route path="dashboard" component={DashboardContainer} onEnter={authenticate} />
      <Redirect from="*" to="/" />
    </Route>
  );
};
