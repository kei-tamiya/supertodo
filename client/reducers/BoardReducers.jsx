import {
  ADD_BOARD,
  SELECT_BOARD,
  CHANGE_SELECTED_VALUE,
  DELETE_BOARD,
  UPDATE_BOARD_TITLE,
  UPDATE_BOARD_POSITION,
  TOGGLE_BOARD,
  REQUEST_BOARDS,
  RECEIVE_BOARDS,
  CLEAR_BOARDS,
  REQUEST_BOARD_ONE,
  RECEIVE_BOARD_ONE,
} from '../actions/BoardActions.jsx';

const initialState = {
  boards: {
    selectedBoard: '',
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
    case SELECT_BOARD:
      return Object.assign({}, state, {
        selectedBoard: action.selectedBoard,
      });
    case CHANGE_SELECTED_VALUE:
      return Object.assign({}, state, {
        selectedBoard: action.selectedBoard,
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
    case REQUEST_BOARD_ONE:

    case RECEIVE_BOARD_ONE:
      if (action.board.date) {
        return Object.assign({}, state, {
          [action.board.date]: action.board,
        });
      }
      return state;
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
        [action.board.date]: action.board,

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
