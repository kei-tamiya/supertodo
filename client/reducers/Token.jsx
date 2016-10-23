import { RECEIVE_TOKEN } from '../actions/Token.jsx';

const initialState = {
  token: {
    token: '',
    isCompleted: false,
  },
};

const token = (state = initialState.token, action) => {
  switch (action.type) {
    case RECEIVE_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
        isCompleted: true,
      });
    default:
      return state;
  }
};

export default token;
