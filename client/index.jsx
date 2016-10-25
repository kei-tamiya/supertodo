import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import injectTapEventPlugin from "react-tap-event-plugin";

import { todos, todosByPetatto } from './reducers/Todo.jsx';
import { boards, boardsByApi } from './reducers/Board.jsx';
import token from './reducers/Token.jsx';
import auth from './reducers/AuthReducers.jsx';
import App from './containers/App.jsx';
import Signup from './containers/auth/Signup.jsx';
import Login from './containers/auth/Login.jsx';
import UserOnly from './containers/auth/UserOnly.jsx';
import GuestOnly from './containers/auth/GuestOnly.jsx';

// import material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const reducer = combineReducers({
  todos,
  todosByPetatto,
  boards,
  boardsByApi,
  token,
  auth,
  routing: routerReducer
});

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// const DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//         <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//     </DockMonitor>
// )
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
              <Route path="signup" component={Signup} />
              <Route path="login" component={Login} />
            </Route>
          </Route>
      </Router>
      {/*<DevTools />*/}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
//
// render(
//   <Provider store={store}>
//       <Router history={history}>
//           <Route path=""
//       </Router>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// )
