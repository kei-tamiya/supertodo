import React from 'react';

export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

export const receiveToken = (token) => ({
  type: RECEIVE_TOKEN,
  token: token
});

export const fetchToken = () => (dispatch) =>  {
  return fetch('http://localhost:8080/token', {credentials: 'same-origin'})
    .then(x => x.json())
    .then(json => {
        if (json == null) {
            return
        }
        dispatch(receiveToken(json.token));
    })
    .catch(error => {
      console.error(error);
    })
};

