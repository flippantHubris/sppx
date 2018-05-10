/* flow */
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESSFUL,
  LOGOUT_SUCCESSFUL,
  AUTH_TOKEN_RECEIVED,
  LOGIN_FAILED,
  LOGOUT_FAILED,
  LOGIN_USER,
} from '../actions/types';
//const baseURL = 'http://sppx.dd:8083/rest/';
const baseURL = 'https://api.sppx.io/rest/';

const INITIAL_STATE_TEST = {
  uid: 175,
  email: 'flippanthubris',
  password: '1875Jung1961!',
  authToken: '',
  isLoggedIn: false,
  cookie: '',
  loginResponse: {},
  error: '',
  loading: false,
  user: {},
  //baseURL: 'http://sppx.dd:8083/rest/',
  //'http://sppx.dd:8083/',
  // 'https://api.sppx.io/rest/',

  url: {
    token: `${baseURL}user/token`,
    login: `${baseURL}user/login`,
    logout: `${baseURL}user/logout`,
    register: `${baseURL}user/register`,
    issues: `${baseURL}node?parameters[type]=issue`,
    node: `${baseURL}node/`,
    profile: `${baseURL}profile/`,
    profileEdit: `${baseURL}profile/edit`,
  },
  getProUrl: type => {
    return `${this.profile}profile/${this.uid}`;
  },
  fetchInit: type => {
    const newHeaders = new Headers();
    newHeaders.append('Content-Type', 'application/json');
    const newInit = {
      method: type,
      headers: newHeaders,
      cache: 'no-cache',
    };
    return newInit;
  },
};

const INITIAL_STATE = {
  uid: 0,
  email: '',
  password: '',
  // email: 'testUser',
  // password: 'password',
  authToken: '',
  isLoggedIn: false,
  cookie: '',
  loginResponse: {},
  error: '',
  loading: false,
  user: {},
  //baseURL: 'http://sppx.dd:8083/rest/',
  //'http://sppx.dd:8083/',
  // 'https://api.sppx.io/rest/',

  url: {
    token: `${baseURL}user/token`,
    login: `${baseURL}user/login`,
    logout: `${baseURL}user/logout`,
    register: `${baseURL}user/register`,
    issues: `${baseURL}node?parameters[type]=issue`,
    node: `${baseURL}node/`,
    profile: `${baseURL}profile/`,
    profileEdit: `${baseURL}profile/edit`,
  },
  getProUrl: type => {
    return `${this.profile}profile/${this.uid}`;
  },
  fetchInit: type => {
    const newHeaders = new Headers();
    newHeaders.append('Content-Type', 'application/json');
    const newInit = {
      method: type,
      headers: newHeaders,
      cache: 'no-cache',
    };
    return newInit;
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case AUTH_TOKEN_RECEIVED:
      return { ...state, authToken: action.payload };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        uid: action.payload.user.uid,
        user: action.payload.user,
        loginResponse: action.payload,
        isLoggedIn: true,
        authToken: action.payload.token,
        cookie: action.payload.sessid,
        loading: false,
      };
    case LOGOUT_SUCCESSFUL:
      return { ...state, isLoggedIn: false };
    case LOGIN_FAILED:
      return { ...state, error: 'Authentication Failed', loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
