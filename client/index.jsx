import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from 'github.com/kei-tamiya/supertodo/client/containers/App'
import reducer from 'github.com/kei-tamiya/supertodo/client/reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
