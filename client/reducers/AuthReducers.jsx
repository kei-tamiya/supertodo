import React from 'react';
import { SIGNUP, LOGIN, LOGOUT  } from '../actions/AuthActions.jsx';

const user = (state = { }, action) => {
  switch (action.type) {
    case SIGNUP:
      // return Object.assign({}, state, {
      //     token: action.token
      // })
    case LOGIN:
    case LOGOUT:
    default:
      return state
  }
};

export default user