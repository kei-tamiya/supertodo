import { combineReducers } from 'redux'

import {
    ADD_TODO, DELETE_TODO, UPDATE_TODO_TITLE,
    UPDATE_TODO_POSITION, TOGGLE_TODO,
    REQUEST_TODOS, RECEIVE_TODOS
} from '../actions/Todo'


const todo = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                id: action.id,
                title: action.title,
                completed: false
            }
        // case TOGGLE_TODO:
        //     if (state.id !== action.id) {
        //         return state
        //     }
        //
        //     return {
        //         state,
        //         completed: !state.completed
        //     }
        default:
            return state
    }
}

const todos = (state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                todo(undefined, action)
            ]
        // case DELETE_TODO:
        //     return state.map(t =>
        //         todo(t, action)
        //     )

        case REQUEST_TODOS:
            return {
                state,
                isFetching: true,
                didInvalidate: false
            }
        case RECEIVE_TODOS:
            return {
                state,
                isFetching: false,
                didInvalidate: false,
                items: action.todos
            }
        default:
            return state
    }

}

const todosByPetatto = (state = { }, action) => {
    switch (action.type) {
        case RECEIVE_TODOS:
        case REQUEST_TODOS:
            return {
                state,
                [action.pataTodos]: todos(state[action.pataTodos], action)
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    todosByPetatto,
    todos
})

export default rootReducer
