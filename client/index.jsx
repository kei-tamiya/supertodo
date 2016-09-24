import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import TodoApp from './containers/App'
// import * as reducers from './reducers/'
import update from './reducers/Count'
import { todos, todosByPetatto } from './reducers/Todo'
import App from './components/App'
import Root from './components/Root'
import Foo from './components/Foo'
import Bar from './components/Bar'


const reducer = combineReducers({
    update,
    todos,
    todosByPetatto,
    routing: routerReducer
})

const middleware = [thunk]
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
)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Root}/>
                <Route path="foo" component={Foo}/>
                <Route path="bar" component={Bar}/>
            </Route>
        </Router>
        {/*<DevTools />*/}
    </Provider>,
    document.getElementById('root')
)
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
