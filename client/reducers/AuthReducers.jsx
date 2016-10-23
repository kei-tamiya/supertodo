import React from 'react';
import {
  REQUEST_SIGNUP,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  EXECUTE_SIGNUP,
  EXECUTE_LOGIN,
  EXECUTE_LOGOUT,
  // FAIL_SIGNUP,
  // FAIL_LOGIN,
  // FAIL_LOGOUT,
  FAIL_FETCH_BY_API,
} from '../actions/AuthActions.jsx';

const initialState = {
  auth: {
    isPrepared: false,
    isLoggedIn: false,
    user: {
      id: undefined,
      email: undefined,
      name: undefined,
      password: undefined,
    },
    isFetching: false,
    error: undefined,
  },
};

const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case REQUEST_SIGNUP:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case EXECUTE_SIGNUP:

    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isPrepared: true,
        isFetching: true,
      });
    case EXECUTE_LOGIN:
      return Object.assign({}, state, {
        user: action.authedUser,
        isFetching: false,
        isLoggedIn: true,
        error: undefined,
      });
    case REQUEST_LOGOUT:
      return state;
    case EXECUTE_LOGOUT:
      return Object.assign({}, initialState);
    // case FAIL_SIGNUP:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     error: action.error
    //   });
    // case FAIL_LOGIN:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     error: action.error
    //   });
    // case FAIL_LOGOUT:
    //   return Object.assign({}, state, {
    //     isFetching: false,
    //     error: action.error
    //   });
    case FAIL_FETCH_BY_API:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
};

export default auth;
