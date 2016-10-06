export const ADD_TODO = 'ADD_TODO';
// export const DELETE_TODO = 'DELETE_TODO'
// export const UPDATE_TODO_TITLE = 'UPDATE_TODO_TITLE'
// export const UPDATE_TODO_POSITION = 'UPDATE_TODO_POSITION'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REQUEST_TODOS = 'REQUEST_TODOS';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';

export const addTodo = (json) => ({
  type: ADD_TODO,
  todo: json
});

export const addTodoByApi = (title) => (dispatch, getState) => {
  const todoToSave = Object.assign({}, {title: title});
  return fetch('http://localhost:8080/api/todos', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getState().token.token
    },
    body: JSON.stringify(todoToSave)
  })
    .then(response => response.json())
    .then(json => {
        if (json == null) {
            return
        }
        dispatch(addTodo(json))
    })
};

// export const deleteTodo = petaTodos => ({
//     type: DELETE_TODO,
//     petaTodos
// })
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

const fetchTodos = (todos) => dispatch => {
  dispatch(requestTodos(todos))
  return fetch('http://localhost:8080/api/todos')
    // .then(console.log(fetch(`http://localhost:8080/api/todos`)))
    .then(response => response.json())
    .then(json => {
        dispatch(receiveTodos(json))
    })
    // デバッグ用
    .catch((error) => {
        console.error(error)
    })
};

const shouldFetchTodos = (state) => {
  const todos = state.todosByPetatto.items;
  if (!todos) {
    return true
  }
  if (todos.isFetching) {
    return false
  }
  return todos.didInvalidate
};

export const fetchTodosIfNeeded = (todos) => (dispatch, getState) => {
  if (shouldFetchTodos(getState())) {
      return dispatch(fetchTodos(todos))
  }
};