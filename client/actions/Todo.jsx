import {
  selectBoard,
} from './BoardActions.jsx';
import { API_ROOT_URL } from '../constant/Url.jsx';

export const ADD_TODO = 'ADD_TODO';
export const CHANGE_NEW_TODO_TITLE = 'CHANGE_NEW_TODO_TITLE';
export const DELETE_TODO = 'DELETE_TODO';
export const REQUEST_DELETE_TODO = 'REQUEST_DELETE_TODO';
// export const UPDATE_TODO_TITLE = 'UPDATE_TODO_TITLE'
// export const UPDATE_TODO_POSITION = 'UPDATE_TODO_POSITION'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REQUEST_TODOS = 'REQUEST_TODOS';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const CLEAR_TODOS = 'CLEAR_TODOS';
export const REQUEST_UPDATE_TODO = 'REQUEST_UPDATE_TODO';
export const CHANGE_TODO_TITLE = 'CHANGE_TODO_TITLE';
export const UPDATE_TODO_TITLE = 'UPDATE_TODO_TITLE';
// export const UPDATE_TODO_SIZE = 'UPDATE_TODO_SIZE';
// export const UPDATE_TODO_POSITION = 'UPDATE_TODO_POSITION';

export const addTodo = (json, date) => ({
  type: ADD_TODO,
  todo: json,
  date
});

export const changeNewTodoTitle = (newTodoTitle) => ({
  type: CHANGE_NEW_TODO_TITLE,
  newTodoTitle: newTodoTitle
});

export const changeTodoTitle = (id, title) => ({
  type: CHANGE_TODO_TITLE,
  id,
  title
});

export const updateTodoTitle = (todo) => ({
  type: UPDATE_TODO_TITLE,
  todo
});

// export const updateTodoSize = (id, width, height) => ({
//   type: UPDATE_TODO_SIZE,
//   todo
// });
//
// export const updateTodoPosition = (id, x, y) => ({
//   type: UPDATE_TODO_TITLE,
//   todo
// });

export const requestUpdateTodo = () => ({
  type: REQUEST_UPDATE_TODO
});

const updateTodoByApi = (todoToUpdate) => {
  const apiUrl = API_ROOT_URL + 'api/todos/' + id;
  fetch(apiUrl, {
    credential: 'same-origin',
    method: 'PUT',
    headers: {
      'ACCEPT': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token,
    },
    body: JSON.stringify(todoToUpdate),
  })
    .then((response) => response.json)
    .then((json) => {
      if (json == null) {
        return null;
      }
      return json.data;
    })
    .catch((error) => {
      console.error(error);
    })
};

export const updateTodoTitleByApi = (id) => (dispatch, getState) => {
  dispatch(requestUpdateTodo());
  const todoToUpdate = Object.assign({}, );
  const apiUrl = API_ROOT_URL + 'api/todos/' + id;
  const updatedTodo = updateTodoByApi(todoToUpdate);
  dispatch(updateTodoTitle(todo));
};

export const addTodoByApi = (title) => (dispatch, getState) => {
  const todoToSave = Object.assign({}, {board_id: getState().selectedBoard.board.id, title: title});
  const date = getState().selectedBoard.board.date;
  return fetch('http://localhost:8080/api/todos', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getState().token.token
    },
    body: JSON.stringify(todoToSave),
  })
    .then(response => response.json())
    .then(json => {
        if (json == null) {
            return
        }
        dispatch(addTodo(json, date))
    })
    .then(() => {
      dispatch(selectBoard(getState().boardsByApi[date]));
    })
};

export const deleteTodo = (id, board) => ({
  type: DELETE_TODO,
  id,
  board
});

export const requestDeleteTodo = () => ({
  type: REQUEST_DELETE_TODO
});
//
// export const updateTodoTitle = petaTodos => ({
//     type: UPDATE_TODO_TITLE,
//     petaTodos
// })
//
// export const updateTodoPosition = petaTodos => ({
//     type: UPDATE_TODO_POSITION,
//     petaTodos
// })
//
// export const toggleTodo = petaTodos => ({
//     type: TOGGLE_TODO,
//     petaTodos
// })

export const requestTodos = (todos = []) => ({
    type: REQUEST_TODOS,
    todos
});

export const receiveTodos = (json) => ({
  type: RECEIVE_TODOS,
  todos: json.data
});

export const clearTodos = () => ({
  type: CLEAR_TODOS
});

const fetchTodos = (todos, userId) => (dispatch, getState) => {
  dispatch(requestTodos(todos));
  return fetch('http://localhost:8080/api/todos', {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token,
    },
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        return;
      }
      dispatch(receiveTodos(json))
    })
    // デバッグ用
    .catch((error) => {
        console.error(error)
    })
};

const deleteTodoByApi = (id) => (dispatch, getState) => {
  dispatch(requestDeleteTodo());
  const date = getState().selectedBoard.board.date;
  let apiUrl = API_ROOT_URL + 'api/todos/' + id;
  fetch(apiUrl, {
    credential: 'same-origin',
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token
    }
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        return;
      }
      dispatch(deleteTodo(id, getState().boardsByApi[date]));
    })
    .then(() => {
      dispatch(selectBoard(getState().boardsByApi[date]))
    })
};

const shouldFetchTodos = (state) => {
  const todosByPetatto = state.todosByPetatto;
  if (!todosByPetatto.todos) {
    return true
  }
  if (todosByPetatto.isFetching) {
    return false
  }
  return todosByPetatto.didInvalidate
};

export const fetchTodosIfNeeded = (todos) => (dispatch, getState) => {
  if (shouldFetchTodos(getState())) {
      return dispatch(fetchTodos(todos));
  }
};

const canDeleteTodo = (state) => {
  const currentBoard = state.selectedBoard.board;
  if (currentBoard.isFetching) {
    return false;
  }
  return true;
};

export const deleteTodoIfPossible = (id) => (dispatch, getState) => {
  if (canDeleteTodo(getState())) {
    dispatch(deleteTodoByApi(id));
  }
};
