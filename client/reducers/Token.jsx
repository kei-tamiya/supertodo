import { RECEIVE_TOKEN } from '../actions/Token.jsx';

const token = (state = { token: '' }, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });
    default:
      return state;
  }
};

export default token;
