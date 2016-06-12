import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { makeRoutes } from './routes';
import AppContainer from './containers/application';
import './style.css';

const routes = makeRoutes();

render((
  <AppContainer
    history={browserHistory}
    routes={routes}
  />
), document.getElementById('root'));
