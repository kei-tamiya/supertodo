export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const UPDATE_TODO_TITLE = 'UPDATE_TODO_TITLE'
export const UPDATE_TODO_POSITION = 'UPDATE_TODO_POSITION'
export const TOGGLE_TODO = 'TOGGLE_TODO'

export const add_todo = todo => ({
  type: ADD_TODO,
  todo
})

export const delete_todo = todo => ({
  type: DELETE_TODO,
  todo
})

export const update_todo_title = todo => ({
  type: UPDATE_TODO_TITLE,
  todo
})

export const update_todo_position = todo => ({
  type: UPDATE_TODO_POSITION,
  todo
})

export const toggle_todo = todo ({
  type: TOGGLE_TODO,
  todo
})


