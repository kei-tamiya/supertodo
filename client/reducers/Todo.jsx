import {
  ADD_TODO,
  CHANGE_NEW_TODO_TITLE,
  DELETE_TODO,
  UPDATE_TODO_TITLE,
  UPDATE_TODO_POSITION,
  TOGGLE_TODO,
  REQUEST_TODOS,
  RECEIVE_TODOS,
} from '../actions/Todo.jsx';

// const todo = (state = {}, action) => {
//     switch (action.type) {
//         case ADD_TODO:
//             return {
//                 state,
//                 todo: action.todo
//             }
//         // case TOGGLE_TODO:
//         //     if (state.id !== action.id) {
//         //         return state
//         //     }
//         //
//         //     return {
//         //         state,
//         //         completed: !state.completed
//         //     }
//         default:
//             return state
//     }
// }

const todos = (state = {
  newTodoTitle: '',
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    // case ADD_TODO:
    //     // const todos = Object.assign({}, getState().todos, action.todos)
    //     // console.log("createdTodos : " + todos)
    //     const myMap = new Map()
    //     myMap.set(Object.keys(state.items).length, action.todo)
    //     const test = Object.assign({}, state.items, myMap)
    //     console.log("test : " + test)
    //     console.log("myMap : " + myMap)
    //
    //     return {
    //         state,
    //         isFetching: false,
    //         items: test
    //     }
    // case DELETE_TODO:
    //     return state.map(t =>
    //         todo(t, action)
    //     )
    case ADD_TODO:
      return Object.assign({}, state, {
        newTodoTitle: '',
      });
    case CHANGE_NEW_TODO_TITLE:
      console.log("action.newTodoTitle," +action.newTodoTitle);

      return Object.assign({}, state, {
        newTodoTitle: action.newTodoTitle,
      });
    case REQUEST_TODOS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        items: action.todos,
      });
    case RECEIVE_TODOS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.todos,
      });
    default:
      return state;
  }
};

const todosByPetatto = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO:
      const myMap = new Map();
      myMap.set(Object.keys(state.items).length, action.todo);
      // const test = Object.assign({}, state.items, myMap)
      return [
        ...state.items,
        myMap
      ];
    case RECEIVE_TODOS:
    case REQUEST_TODOS:
      return Object.assign({}, state, {
        items: todos(state[action.todos], action),
      });
    default:
      return state;
  }
};

export {
  todos,
  todosByPetatto,
};
