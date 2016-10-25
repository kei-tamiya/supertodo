import { API_ROOT_URL } from '../constant/Url.jsx';

export const ADD_BOARD = 'ADD_BOARD';
export const CLEAR_BOARDS = 'CLEAR_BOARDS';
export const REQUEST_BOARDS = 'REQUEST_BOARDS';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';

export const addBoard = (json) => ({
  type: ADD_BOARD,
  boards: json
});

export const clearBoards = () => ({
  type: CLEAR_BOARDS
});

export const requestBoards = (boards = []) => ({
  type: REQUEST_BOARDS,
  boards
});

export const receiveBoards = (boards) => ({
  type: RECEIVE_BOARDS,
  boards
});

const fetchBoardsByApi = (boards) => (dispatch, getState) => {
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
      console.log("json.stringidyf json.data   : "  + JSON.stringify(json.data))
      dispatch(receiveBoards(json.data))
    })
    .catch(error => {
      console.error(error);
    })
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

const fetchBoardsByApiIfNeeded = (boards) => (dispatch, getState) => {
  if (shouldFetchBoards(getState())) {
    dispatch(fetchBoardsByApi());
  }
};