import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { makeRoutes } from './routes';
import rootReducer from './redux';
import './style.css';

const store = createStore(
  combineReducers({
    ...rootReducer,
    routing: routerReducer,
  }),
  applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

const routes = makeRoutes();

render((
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('root'));
