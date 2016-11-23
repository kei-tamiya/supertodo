import { API_ROOT_URL } from '../constant/Url.jsx';

export const ADD_BOARD = 'ADD_BOARD';
export const SELECT_BOARD = 'SELECT_BOARD';
export const ADD_TODO = 'ADD_TODO';
export const CHANGE_NEW_TODO_TITLE = 'CHANGE_NEW_TODO_TITLE';

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
  board
});

export const selectOrAddBoard = (date) => (dispatch, getState) => {
  let boardsByApiState = getState().boardsByApi;
  const boardDates = boardsByApiState.dates;
  if (boardDates && boardDates.includes(date)) {
    dispatch(selectBoard(boardsByApiState[date]));
    return
  }
  dispatch(addBoardOneByApi(date));
};

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
  const boardToSave = Object.assign({}, {date: date});
  let apiUrl = API_ROOT_URL + 'api/boards/';
  return fetch(apiUrl, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token
    },
    body: JSON.stringify(boardToSave),
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        return
      }
      dispatch(addBoard(json.data, date));
    })
    .then(() => {
      dispatch(selectBoard(getState().boardsByApi[date]));
    })
};

// const fetchOrAddBoardOneByApi = (date) => (dispatch, getState) => {
//   dispatch(requestBoardOne());
//   const boardToSave = Object.assign({}, {date: date});
//
//   let apiUrl = API_ROOT_URL + 'api/boards/';
//   return fetch(apiUrl, {
//     credentials: 'same-origin',
//     method: 'PUT',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-XSRF-TOKEN': getState().token.token,
//     },
//     body: JSON.stringify(boardToSave),
//   })
//     .then(response => response.json())
//     .then(json => {
//       if (json == null) {
//         return;
//       }
//       dispatch(receiveBoardOne(json.data))
//     })
//     .catch(error => {
//       console.error(error);
//     })
// };

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
      dispatch(receiveBoards(json.data.boards));
    })
    .then(() => {
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth()+1;
      let date = d.getDate();
      let today = `${year}${month}${date}`;
      dispatch(selectOrAddBoard(today));
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
  if (!boardsByApi.dates) {
    return true;
  }
  if (boardsByApi.isFetching) {
    return false;
  }
  return boardsByApi.didInvalidate;
};

export const fetchOrAddBoardOneByApiIfNeeded = (date) => (dispatch, getState) => {
  if (shouldFetchBoardOne(getState(), date)) {
    dispatch(addBoardOneByApi(date));
  } else {
    dispatch(selectBoard(getState().boardsByApi[date]))
  }
};

export const fetchBoardsByApiIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchBoards(getState())) {
    dispatch(fetchBoardsByApi());
  }
};

// export const fetchBoardAndSelectTodayWhenComponentDidMount = () => (dispatch, getState) => {
//   if (shouldFetchBoards(getState())) {
//     dispatch(fetchBoardsByApi());
//   }
// }
