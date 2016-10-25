import {
  ADD_BOARD,
  CHANGE_NEW_BOARD_TITLE,
  DELETE_BOARD,
  UPDATE_BOARD_TITLE,
  UPDATE_BOARD_POSITION,
  TOGGLE_BOARD,
  REQUEST_BOARDS,
  RECEIVE_BOARDS,
  CLEAR_BOARDS,
} from '../actions/BoardActions.jsx';

const initialState = {
  boards: {
    newTodoTitle: '',
    items: undefined,
  },
  boardsByPetatto: {
    isFetching: false,
    didInvalidate: false,
    boards: undefined,
  }
};

const boards = (state = initialState.boards, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return Object.assign({}, state, {
        newTodoTitle: '',
      });
    case CHANGE_NEW_BOARD_TITLE:
      return Object.assign({}, state, {
        newTodoTitle: action.newTodoTitle,
      });
    case REQUEST_BOARDS:
      return Object.assign({}, state, {
        items: action.boards,
      });
    case RECEIVE_BOARDS:
      return Object.assign({}, state, {
        items: action.boards,
      });
    case CLEAR_BOARDS:
      return Object.assign({}, initialState.boards);
    default:
      return state;
  }
};

const boardsByApi = (state = initialState.boardsByPetatto, action) => {
  switch (action.type) {
    case ADD_BOARD:
      const myMap = new Map();
      myMap.set(Object.keys(state.items).length, action.board);
      return Object.assign({}, state, {
        boards: [
          ...state.items,
          myMap
        ],
      });

    case REQUEST_BOARDS:
      console.log("tetetete : " + JSON.stringify(boards(state[action.boards], action)))
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        boards: action.boards.items,
      });
    case RECEIVE_BOARDS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        boards: action.boards,
      });
    case CLEAR_BOARDS:
      return Object.assign({});
    default:
      return state;
  }
};

export {
  boards,
  boardsByApi,
};
