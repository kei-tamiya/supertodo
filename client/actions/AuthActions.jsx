export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const EXECUTE_SIGNUP = 'EXECUTE_SIGNUP';
export const EXECUTE_LOGIN = 'EXECUTE_LOGIN';
export const EXECUTE_LOGOUT = 'EXECUTE_LOGOUT';
// export const FAIL_SIGNUP = 'FAIL_SIGNUP';
// export const FAIL_LOGIN = 'FAIL_LOGIN';
// export const FAIL_LOGOUT = 'FAIL_LOGOUT';
export const FAIL_FETCH_BY_API = 'FAIL_FETCH_BY_API';


export const requestSignup = () => ({
  type: REQUEST_SIGNUP
});

export const requestLogin = () => ({
  type: REQUEST_LOGIN
});

export const requestLogout = () => ({
  type: REQUEST_LOGOUT
});

export const executeSignup = () => ({
  type: EXECUTE_SIGNUP
});

export const executeLogin = (authedUser) => ({
  type: EXECUTE_LOGIN,
  authedUser: authedUser
});

export const executeLogout = () => ({
  type: EXECUTE_LOGOUT
});

export const failFetchByApi = (error) => ({
  type: FAIL_FETCH_BY_API,
  error: error
});
// export const failSignup = (error) => ({
//   type: FAIL_SIGNUP,
//   error: error
// });
//
// export const failLogin = (error) => ({
//   type: FAIL_LOGIN
// });
//
// export const failLogout = (error) => ({
//   type: FAIL_LOGOUT
// });

export const signupByApi = (email, name, password) => (dispatch, getState) => {
  dispatch(requestSignup());
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
      dispatch(executeSignup());
      dispatch(loginByApi(email, password));
    })
    .catch((error) => {
      dispatch(failFetchByApi(error));
    })
};

export const loginByApi = (email, password) => (dispatch, getState) => {
  dispatch(requestLogin());
  const userToLogin = Object.assign({}, {
    email: email,
    password: password,
  });
  return fetch('http://localhost:8080/api/login', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token,
    },
    body: JSON.stringify(userToLogin),
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        return;
      }

      userToLogin.id = json.data.id;
      userToLogin.name = json.data.name;

      localStorage.setItem('isLoggedIn', "true");
      dispatch(executeLogin(userToLogin));
    })
    .catch((error) => {
      dispatch(failFetchByApi(error));
    })
};

export const fetchLoggedInUser = () => (dispatch, getState) => {
  let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  
  if (isLoggedIn) {
    console.log("kokokok nothing")
    return fetch('http://localhost:8080/api/loggedinuser', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getState().token.token,
      }
    })
      .then(response => response.json())
      .then(json => {
        if (json == null) {
          return;
        }

        let data = json.data;
        console.log("data  : " + json.data);
        let authedUser = Object.assign({}, {
          id: data.id,
          email: data.email,
          name: data.name,
        });

        dispatch(executeLogin(authedUser));
      })
      .catch((error) => {
        dispatch(failFetchByApi(error));
      })
  }
};

export const logoutByApi = () => (dispatch, getState) => {
  dispatch(requestLogout());
  return fetch('http://localhost:8080/api/logout', {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getState().token.token,
    }
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        return;
      }
      localStorage.setItem('isLoggedIn', "false");
      dispatch(executeLogout());
    })
    .catch((error) => {
      dispatch(failFetchByApi(error));
    })
};
