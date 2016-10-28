import {
  ADD_BOARD,
  CHANGE_SELECTED_VALUE,
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
    selectedValue: '',
    items: undefined,
  },
  boardsByApi: {
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
    case CHANGE_SELECTED_VALUE:
      return Object.assign({}, state, {
        selectedValue: action.selectedValue,
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

const boardsByApi = (state = initialState.boardsByApi, action) => {
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
