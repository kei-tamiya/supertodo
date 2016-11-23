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
  SYNC_TODOS,
} from '../actions/BoardActions.jsx';

import {
  ADD_TODO,
  CHANGE_NEW_TODO_TITLE,
} from '../actions/Todo.jsx';

const initialState = {
  selectedBoard: {
    board: undefined,
    newTodoTitle: '',
  },
  board: {
    id: undefined,
    isFetching: false,
    didInvalidate: false,
    todos: undefined,
    date: undefined,
  },
  boardsByApi: {
    dates: undefined,
  }
};

const selectedBoard = (state = initialState.selectedBoard, action) => {
  switch (action.type) {
    case SELECT_BOARD:
      return Object.assign({}, state, {
        board: action.board,
      });
    case ADD_TODO:
      return Object.assign({}, state, {
        newTodoTitle: '',
      });
    case CHANGE_NEW_TODO_TITLE:
      return Object.assign({}, state, {
        newTodoTitle: action.newTodoTitle,
      });
    default:
      return state
  }
};

const board = (state = initialState.board, action) => {
  switch (action.type) {
    // case ADD_BOARD:
    //   return Object.assign({}, state, {
    //     newTodoTitle: '',
    //   });
    // case SELECT_BOARD:
    //   return Object.assign({}, state, {
    //     selectedBoard: action.selectedBoard,
    //   });
    // case CHANGE_SELECTED_VALUE:
    //   return Object.assign({}, state, {
    //     selectedBoard: action.selectedBoard,
    //   });
    // case REQUEST_BOARDS:
    //   return Object.assign({}, state, {
    //     todos: action.boards,
    //   });
    // case RECEIVE_BOARDS:
    //   return Object.assign({}, state, {
    //     todos: action.boards,
    //   });
    case SYNC_TODOS:
      return Object.assing({}, state, {
        todos: action.todos[state.date],
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
      return Object.assign({}, state, {
        [action.date]: board(initialState.board, action)
      });
    case ADD_TODO:
      // const todosMap = new Map();

      let date = action.date;
      let currentBoard = state[date];
      let newTodos = [];
      if (currentBoard.todos !== undefined) {
        newTodos = currentBoard.todos.slice();
      }
      newTodos.push(action.todo);
      let boardMap = Object.assign({}, currentBoard, {
        todos: newTodos,
      });
      return Object.assign({}, state, {
        [date]: boardMap,
      });
    // case REQUEST_BOARD_ONE:
    //   return Object.assign({}, state, {
    //     boards: action.boards.todos,
    //   });
    // case RECEIVE_BOARD_ONE:
    //   if (action.board.date) {
    //     return Object.assign({}, state, {
    //       [action.board.date]: action.board,
    //     });
    //   }
    //   return state;
    // case REQUEST_BOARDS:
    //   return Object.assign({}, state, {
    //     boards: action.boards.todos,
    //   });
    case RECEIVE_BOARDS:
      const boardsAllMap = {};
      let dateArr = [];
      if (action.boards) {
        action.boards.forEach((item) => {
          const boardState = Object.assign({}, initialState.board);
          if (item.todos) {
            boardState.todos = item.todos;
          }
          boardState.id = item.board_id;
          let date = item.date;
          boardState.date = date;
          boardsAllMap[item.date] = board(boardState, action);
          dateArr.push(date);
        });
      }
      return Object.assign({}, state, {
        ...boardsAllMap,
        dates: dateArr,
      });
    case CLEAR_BOARDS:
      return Object.assign({});
    case SYNC_TODOS:
      const boardsMap = new Map();
      Object.keys(action.todos).forEach((key) =>
        boardsMap.set(key, board({date: key}, action))
      );
      return Object.assign({}, state, myMap);
    default:
      return state;
  }
};

export {
  boardsByApi,
  selectedBoard,
};
