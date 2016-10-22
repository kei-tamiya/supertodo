import React from 'react';

export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

const initialState = {
  isTokenFetched: false,
  token: ""
};

export const receiveToken = (state = initialState, token) => ({
  type: RECEIVE_TOKEN,
  token: token
});

export const fetchToken = () => (dispatch, getState) =>  {
  return fetch('http://localhost:8080/token', {credentials: 'same-origin'})
    .then(x => x.json())
    .then(json => {
        if (json == null) {
            return
        }
        // console.log("json : " + json)
        dispatch(receiveToken(getState(), json.token))
    });
    // .catch(err => {
    //     console.error('fetch error', err);
    // });
};

