import { API_ROOT_URL } from '../constant/Url.jsx';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

export const receiveToken = token => ({
  type: RECEIVE_TOKEN,
  token,
});

export const fetchToken = () => (dispatch) => {
  const apiUrl = `${API_ROOT_URL}token`;
  return fetch(apiUrl, {
    credentials: 'same-origin',
  })
    .then(x => x.json())
    .then((json) => {
      if (json == null) {
        return;
      }
      dispatch(receiveToken(json.token));
    })
    .catch((error) => {
      console.error(error);
    });
};
