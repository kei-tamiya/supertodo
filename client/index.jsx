import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import injectTapEventPlugin from "react-tap-event-plugin";

import { selectedBoard, boardsByApi } from './reducers/BoardReducers.jsx';
import token from './reducers/TokenReducers.jsx';
import auth from './reducers/AuthReducers.jsx';
import App from './containers/App.jsx';
import Signup from './containers/auth/Signup.jsx';
import Login from './containers/auth/Login.jsx';
import UserOnly from './containers/auth/UserOnly.jsx';
import GuestOnly from './containers/auth/GuestOnly.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const reducer = combineReducers({
  selectedBoard,
  boardsByApi,
  token,
  auth,
  routing: routerReducer
});

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();
render(
  <MuiThemeProvider>
    <Provider store={store}>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
          <Route path="/" component={App}>
            <Route component={UserOnly}>
            </Route>
            <Route component={GuestOnly}>
              <IndexRoute component={Login} />
              <Route path="signup" component={Signup} />
              <Route path="login" component={Login} />
            </Route>
          </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);