export const ADD_TODO = 'ADD_TODO'
// export const DELETE_TODO = 'DELETE_TODO'
// export const UPDATE_TODO_TITLE = 'UPDATE_TODO_TITLE'
// export const UPDATE_TODO_POSITION = 'UPDATE_TODO_POSITION'
// export const TOGGLE_TODO = 'TOGGLE_TODO'
export const REQUEST_TODOS = 'REQUEST_TODOS'
export const RECEIVE_TODOS = 'RECEIVE_TODOS'

let nextTodoId = 0
export const addTodo = title => ({
    type: ADD_TODO,
    id: nextTodoId++,
    title
})
//
// export const deleteTodo = pataTodos => ({
//     type: DELETE_TODO,
//     pataTodos
// })
//
// export const updateTodoTitle = pataTodos => ({
//     type: UPDATE_TODO_TITLE,
//     pataTodos
// })
//
// export const updateTodoPosition = pataTodos => ({
//     type: UPDATE_TODO_POSITION,
//     pataTodos
// })
//
// export const toggleTodo = pataTodos => ({
//     type: TOGGLE_TODO,
//     pataTodos
// })

export const requestTodos = pataTodos => ({
    type: REQUEST_TODOS,
    pataTodos
})

export const receiveTodos = (pataTodos, json) => ({
    type: RECEIVE_TODOS,
    pataTodos
})

const fetchTodos = pataTodos => dispatch => {
    dispatch(requestTodos(pataTodos))
    return fetch(`http://localhost:8080/api/todos`)
        // .then(console.log(fetch(`http://localhost:8080/api/todos`)))
        .then(response => response.json())
        .then(json => {
            dispatch(receiveTodos(pataTodos, json))
            console.log(json)
        })

        .catch((error) => {
            console.error(error)
        })
}

const shouldFetchTodos = (state, pataTodos) => {
    const todos = state.todosByPetatto[pataTodos]
    if (!todos) {
        return true
    }
    if (todos.isFetching) {
        return false
    }
    return todos.didInvalidate
}

export const fetchTodosIfNeeded = pataTodos => (dispatch, getState) => {
    if (shouldFetchTodos(getState(), pataTodos)) {
        return dispatch(fetchTodos(pataTodos))
    }
}