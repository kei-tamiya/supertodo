import {
  ADD_BOARD,
  SELECT_BOARD,
  REQUEST_BOARDS,
  RECEIVE_BOARDS,
  CLEAR_BOARDS,
} from '../actions/BoardActions.jsx';

import {
  ADD_TODO,
  CHANGE_NEW_TODO_TITLE,
  DELETE_TODO,
  REQUEST_DELETE_TODO,
  CHANGE_TODO_TITLE,
  UPDATE_TODO,
  REQUEST_UPDATE_TODO,
  TOGGLE_TODO_COMPLETED,
  CHANGE_TODO_POSITION,
  CHANGE_TODO_SIZE,
} from '../actions/TodoActions.jsx';

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
    isDeleting: false,
    isUpdating: false,
  },
};

const selectedBoard = (
  state = initialState.selectedBoard,
  action,
) => {
  switch (action.type) {
    case SELECT_BOARD: {
      return Object.assign({}, state, {
        board: action.board,
      });
    }
    case ADD_TODO: {
      return Object.assign({}, state, {
        newTodoTitle: '',
      });
    }
    case CHANGE_NEW_TODO_TITLE: {
      return Object.assign({}, state, {
        newTodoTitle: action.newTodoTitle,
      });
    }
    case CHANGE_TODO_TITLE: {
      const changeTodoTitleState = Object.assign({}, state);
      changeTodoTitleState.board.todos = state.board.todos.map(todo =>
        (todo.id === action.id ?
          { ...todo, title: action.title } :
          todo
        ),
      );
      return changeTodoTitleState;
    }
    case TOGGLE_TODO_COMPLETED: {
      const toggeleTodoCompletedState = Object.assign({}, state);
      toggeleTodoCompletedState.board.todos = state.board.todos.map(todo =>
        (todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
        ),
      );
      return toggeleTodoCompletedState;
    }
    case CHANGE_TODO_POSITION: {
      const changeTodoPositionState = Object.assign({}, state);
      changeTodoPositionState.board.todos = state.board.todos.map(todo =>
        (todo.id === action.id ?
          { ...todo, pos_top: action.pos_top, pos_left: action.pos_left } :
          todo
        ),
      );
      return changeTodoPositionState;
    }
    case CHANGE_TODO_SIZE: {
      const changeTodoSizeState = Object.assign({}, state);
      changeTodoSizeState.board.todos = state.board.todos.map(todo =>
        (todo.id === action.id ?
          { ...todo, width: action.width, height: action.height } :
          todo
        ),
      );
      return changeTodoSizeState;
    }
    default: {
      return state;
    }
  }
};

const board = (
  state = initialState.board,
  action,
) => {
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
    case CLEAR_BOARDS: {
      return Object.assign({}, initialState.boards);
    }
    default: {
      return state;
    }
  }
};

const boardsByApi = (
  state = initialState.boardsByApi,
  action,
) => {
  switch (action.type) {
    case ADD_BOARD: {
      const boardOne = action.board;
      const boardDate = action.board.date;
      const boardState = Object.assign({}, initialState.board, {
        id: boardOne.id,
        date: boardDate,
      });
      return Object.assign({}, state, {
        [boardDate]: board(boardState, action),
      });
    }
    case ADD_TODO: {
      const date = action.date;
      const currentBoard = state[date];
      let newTodos = [];
      if (currentBoard.todos !== undefined) {
        newTodos = currentBoard.todos.slice();
      }
      newTodos.push(action.todo);
      const boardMap = Object.assign({}, currentBoard, {
        todos: newTodos,
      });
      return Object.assign({}, state, {
        [date]: boardMap,
      });
    }
    case RECEIVE_BOARDS: {
      const boardsAllMap = {};
      const dateArr = [];
      if (action.boards) {
        action.boards.forEach((item) => {
          const boardState = Object.assign({}, initialState.board);
          if (item.todos) {
            boardState.todos = item.todos;
          }
          boardState.id = item.board_id;
          const date = item.date;
          boardState.date = date;
          boardsAllMap[item.date] = board(boardState, action);
          dateArr.push(date);
        });
      }
      return Object.assign({}, state, {
        ...boardsAllMap,
        dates: dateArr,
      });
    }
    case CLEAR_BOARDS: {
      return Object.assign({});
    }
    case REQUEST_DELETE_TODO: {
      return Object.assign({}, state, {
        isDeleting: true,
      });
    }
    case DELETE_TODO: {
      const newCurrentBoard = Object.assign({}, action.board, {
        todos: action.board.todos.filter(todo =>
          todo.id !== action.id,
        ),
      });
      return Object.assign({}, state, {
        isDeleting: false,
        [action.board.date]: newCurrentBoard,
      });
    }
    case REQUEST_UPDATE_TODO: {
      return Object.assign({}, state, {
        isUpdateing: true,
      });
    }
    case UPDATE_TODO: {
      const date = action.date;
      const boardObj = Object.assign({}, state[date], {
        todos: action.todos.slice(),
      });
      return Object.assign({}, state, {
        isUpdateing: false,
        [action.date]: boardObj,
      });
    }
    default: {
      return state;
    }
  }
};

export {
  boardsByApi,
  selectedBoard,
};
