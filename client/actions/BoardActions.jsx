import { API_ROOT_URL } from '../constant/Url.jsx';

export const ADD_BOARD = 'ADD_BOARD';
export const SELECT_BOARD = 'SELECT_BOARD';
export const CHANGE_SELECTED_VALUE = 'CHANGE_SELECTED_VALUE';
export const CLEAR_BOARDS = 'CLEAR_BOARDS';
export const REQUEST_BOARD_ONE = 'REQUEST_BOARD_ONE';
export const RECEIVE_BOARD_ONE = 'RECEIVE_BOARD_ONE';
export const REQUEST_BOARDS = 'REQUEST_BOARDS';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';
export const SYNC_TODOS = 'SYNC_TODOS';

export const addBoard = (board) => ({
  type: ADD_BOARD,
  board
});

export const selectBoard = (board) => ({
  type: SELECT_BOARD,
  board: board
});

export const clearBoards = () => ({
  type: CLEAR_BOARDS
});

export const requestBoardOne = (board) => ({
  type: REQUEST_BOARD_ONE,
  board
});

export const receiveBoardOne = (board) => ({
  type: RECEIVE_BOARD_ONE,
  board
});

export const requestBoards = (boards = []) => ({
  type: REQUEST_BOARDS,
  boards
});

export const receiveBoards = (boards) => ({
  type: RECEIVE_BOARDS,
  boards
});

export const syncTodos = (boards, todos) => ({
  type: SYNC_TODOS,
  boards: boards,
  todos: todos
});

export const fetchOrAddBoardByApi = (date) => (dispatch, getState) => {
  fetchBoardOneByApiIfNeeded(getState().boards, date);
  if (shouldFetchBoardOne(getState(), date)) {
    dispatch(addBoardOneByApi(date));
  }
};

export const addBoardOneByApi = (date) => (dispatch, getState) => {
  // const todoToSave = Object.assign({}, {title: title});
  let apiUrl = API_ROOT_URL + 'api/boards/';
  return fetch(apiUrl, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token
    },
    // body: JSON.stringify(todoToSave)
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        return
      }
      dispatch(addBoard(json.data));
    })
};

const fetchBoardOneByApi = () => (dispatch, getState) => {
  dispatch(requestBoardOne());

  let apiUrl = API_ROOT_URL + 'api/board/';
  return fetch(apiUrl, {
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
      dispatch(receiveBoardOne(json.data))
    })
    .catch(error => {
      console.error(error);
    })
};

const fetchBoardsByApi = () => (dispatch, getState) => {
  dispatch(requestBoards());

  let apiUrl = API_ROOT_URL + 'api/boards/';
  return fetch(apiUrl, {
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
      console.log("receive : " + JSON.stringify(json));
      dispatch(receiveBoards(json.data))
    })
    .catch(error => {
      console.error(error);
    })
};

const shouldFetchBoardOne = (state, date) => {
  let board = state.boardsByApi[date];
  if (!board) {
    return true;
  }
  if (board.isFetching) {
    return false;
  }
  return board.didInvalidate;
};

const shouldFetchBoards = (state) => {
  let boardsByApi = state.boardsByApi;
  if (!boardsByApi.boards) {
    return true;
  }
  if (boardsByApi.isFetching) {
    return false;
  }
  return boardsByApi.didInvalidate;
};

export const fetchBoardOneByApiIfNeeded = (boards, date) => (dispatch, getState) => {
  if (shouldFetchBoardOne(getState(), date)) {
    dispatch(fetchBoardOneByApi());
  }
};

export const fetchBoardsByApiIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchBoards(getState())) {
    dispatch(fetchBoardsByApi());
  }
};
