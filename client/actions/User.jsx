export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const signup = () => {
  type: SIGNUP
};

export const signupByApi = (email, name, password) => (dispatch, getState) => {
  const userToSave = Object.assign({}, {
    email: email,
    name: name,
    password: password,
  });
  return fetch('http://localhost:8080/api/signup', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token,
    },
    body: JSON.stringify(userToSave),
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
          return;
      }
      dispatch(signup());
    })
};

export const login = () => {
  type: LOGIN
};

export const logout = () => {
  type: LOGOUT
};
