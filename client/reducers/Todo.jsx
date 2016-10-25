import {
  ADD_TODO,
  CHANGE_NEW_TODO_TITLE,
  DELETE_TODO,
  UPDATE_TODO_TITLE,
  UPDATE_TODO_POSITION,
  TOGGLE_TODO,
  REQUEST_TODOS,
  RECEIVE_TODOS,
  CLEAR_TODOS,
} from '../actions/Todo.jsx';

const initialState = {
  todos: {
    newTodoTitle: '',
    items: undefined,
  },
  todosByPetatto: {
    isFetching: false,
    didInvalidate: false,
    todos: undefined,
  }
};

const todos = (state = initialState.todos, action) => {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        newTodoTitle: '',
      });
    case CHANGE_NEW_TODO_TITLE:
      return Object.assign({}, state, {
        newTodoTitle: action.newTodoTitle,
      });
    case REQUEST_TODOS:
      return Object.assign({}, state, {
        items: action.todos,
      });
    case RECEIVE_TODOS:
      return Object.assign({}, state, {
        items: action.todos,
      });
    case CLEAR_TODOS:
      return Object.assign({}, initialState.todos);
    default:
      return state;
  }
};

const todosByPetatto = (state = initialState.todosByPetatto, action) => {
  switch (action.type) {
    case ADD_TODO:
      const myMap = new Map();
      myMap.set(Object.keys(state.items).length, action.todo);
      return Object.assign({}, state, {
        todos: [
          ...state.items,
          myMap
        ],
      });

    case REQUEST_TODOS:
      console.log("tetetete : " + JSON.stringify(todos(state[action.todos], action)))
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        todos: action.todos.items,
      });
    case RECEIVE_TODOS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        todos: action.todos,
      });
    case CLEAR_TODOS:
      return Object.assign({});
    default:
      return state;
  }
};

export {
  todos,
  todosByPetatto,
};
