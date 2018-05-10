/* flow */

import { Alert } from 'react-native';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESSFUL,
  LOGOUT_SUCCESSFUL,
  AUTH_TOKEN_RECEIVED,
  LOGIN_FAILED,
  LOGOUT_FAILED,
  LOGIN_USER,
} from './types';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

class Fetch {
  constructor(dispatch, getState) {
    this.dispatch = dispatch;
    this.getState = getState;
  }
  getInit(type) {
    const newHeaders = new Headers();
    newHeaders.append('Content-Type', 'application/json');
    const newInit = {
      method: type,
      headers: newHeaders,
      cache: 'no-cache',
    };
    return newInit;
  }

  getInitWithToken() {
    //return this.getInit().header.append('X-CSRF-Token', this.getState().auth.authToken);
    const newHeaders = new Headers();
    newHeaders.append('Content-Type', 'application/json');
    newHeaders.append('X-CSRF-Token', this.getState().auth.authToken);
    const newInit = {
      method: 'POST',
      headers: newHeaders,
      cache: 'no-cache',
    };
    return newInit;
  }

  getForBody(body) {
    //const init = (this.getInitWithToken().body = JSON.stringify(body));
    const newHeaders = new Headers();
    newHeaders.append('Content-Type', 'application/json');
    newHeaders.append('X-CSRF-Token', this.getState().auth.authToken);
    const newInit = {
      method: 'POST',
      headers: newHeaders,
      body: JSON.stringify(body),
      cache: 'no-cache',
    };
    return newInit;
  }

  async post(url, action) {
    let response = await fetch('https://api.sppx.io/rest/user/login', this.getInit());
    const json = await response.json();
    if (response.status == '200') {
      this.dispatch({ type: `${action}_SUCCESSFUL`, payload: json });
    } else {
      this.dispatch({
        type: `${action}_SUCCESSFUL`,
        payload: response.status,
        responce: json,
      });
    }
  }
}

export const getAuthToken = () => async (dispatch, getState) => {
  const response = await fetch(getState().auth.url.token, getState().auth.fetchInit('POST'));
  const json = await response.json();
  if (response.status == '200') {
    dispatch({ type: AUTH_TOKEN_RECEIVED, payload: json.token });
  } else {
    dispatch({ type: 'AUTH_TOKEN_FAILED', payload: json });
  }

  // fetch(getState().auth.url.token, getState().auth.fetchInit('POST')).then(response => {
  //   response
  //     .json()
  //     .then(resJSON => dispatch({ type: AUTH_TOKEN_RECEIVED, payload: resJSON.token }));
  // });
};

const postLogout = getState => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('X-CSRF-Token', getState().auth.authToken);
  const init = {
    method: 'POST',
    headers,
    cache: 'no-cache',
  };

  return fetch(getState().auth.url.logout, init);
};
// = () => async (dispatch: *, getState: *) => {

export const logout = () => async (dispatch, getState) => {
  postLogout(getState).then(response => {
    //console.log(response);
    if (response.status == '200') {
      response.json().then(resJSON => dispatch({ type: LOGOUT_SUCCESSFUL, payload: resJSON }));
    } else {
      dispatch({ type: LOGOUT_FAILED, payload: response });
    }
  });
};

export const loginThunk = () => async (dispatch, getState) => {
  dispatch({ type: LOGIN_USER });

  if (getState().auth.email === '') {
    alert('Please enter your username.');
    dispatch({ type: LOGIN_FAILED });
  } else if (getState().auth.password === '') {
    alert('Please enter you password');
    dispatch({ type: LOGIN_FAILED });
  } else {
    const logHeaders = new Headers();
    logHeaders.append('Content-Type', 'application/json');
    logHeaders.append('X-CSRF-Token', getState().auth.authToken);
    const logInit = {
      method: 'POST',
      headers: logHeaders,
      body: JSON.stringify({
        username: getState().auth.email,
        password: getState().auth.password,
      }),
      cache: 'no-cache',
    };

    const response = await fetch(getState().auth.url.login, logInit);
    const json = await response.json();
    if (response.status == '200') {
      dispatch({ type: LOGIN_SUCCESSFUL, payload: json });
    } else {
      dispatch({
        type: LOGIN_FAILED,
        payload: response.status,
        responce: json,
      });
      alert(json);
    }
  }
};
