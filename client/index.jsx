import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import injectTapEventPlugin from "react-tap-event-plugin";
import TodoApp from './containers/App.jsx';
// import * as reducers from './reducers/';
import update from './reducers/Count.jsx';
import { todos, todosByPetatto } from './reducers/Todo.jsx';
import token from './reducers/Token.jsx';
import user from './reducers/User.jsx';
import App from './components/App.jsx';
import Root from './components/Root.jsx';
import Foo from './components/Foo.jsx';
import Bar from './components/Bar.jsx';
import Signup from './containers/Signup.jsx';
import Material from './containers/Material.jsx';


const reducer = combineReducers({
  update,
  todos,
  todosByPetatto,
  token,
  user,
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
    applyMiddleware(...middleware),
    // DevTools.instrument()
);

const history = syncHistoryWithStore(browserHistory, store);


injectTapEventPlugin();
render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Root}/>
                <Route path="foo" component={Foo}/>
                <Route path="bar" component={Bar}/>
                <Route path="signup" component={Signup}/>
                <Route path="material" component={Material} />
            </Route>
        </Router>
        {/*<DevTools />*/}
    </Provider>,
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
