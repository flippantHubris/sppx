/* flow */
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AUTH_TOKEN_RECEIVED,
  REGISTER_SEND,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USERNAME_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  name: '',
  email: '',
  confEmail: '',

  firstName: '',
  middleName: '',
  lastName: '',
  initials: '',
  pin: '',
  address: '',
  city: '',
  zip: '',
  phone: '',
  password: '',
  authToken: '',
  registerSuccess: false,
  cookie: '',
  error: '',
  loading: false,
  driversLicense: {},
};

const INITIAL_STATE_TEST = {
  username: 'dogen',
  name: 'dogen',
  email: 'jungdogen@gmail.com',
  confEmail: 'jungdogen@gmail.com',

  firstName: 'Shane',
  middleName: '',
  lastName: 'Brown',
  initials: 'SB',
  pin: '',
  address: '1234',
  city: 'eag',
  zip: '12345',
  phone: '',
  password: 'password',
  authToken: '',
  registerSuccess: false,
  cookie: '',
  error: '',
  loading: false,
  driversLicense: {},
};

export default (state = INITIAL_STATE, action) => {
  // console.log(state);
  // console.log('--------------');
  // console.log('action recieved:');
  // console.log(action);

  switch (action.type) {
    case 'FIRSTNAME_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, firstName: action.payload };
    case 'LASTNAME_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, lastName: action.payload };
    case 'ADDRESS_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, address: action.payload };
    case 'CITY_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, city: action.payload };
    case 'INITIALS_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, initials: action.payload };
    case 'ZIP_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, zip: action.payload };
    case 'PIN_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, pin: action.payload };
    case USERNAME_CHANGED:
      // take the properties from previous state oject and creates a new object
      return { ...state, name: action.payload };
    case EMAIL_CHANGED:
      // take the properties from previous state oject and creates a new object
      return { ...state, email: action.payload };
    case 'EMAIL_CONF_CHANGED':
      // take the properties from previous state oject and creates a new object
      return { ...state, confEmail: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case AUTH_TOKEN_RECEIVED:
      console.log(state);
      return { ...state, authToken: action.payload };

    case 'REGISTER_SUCCESS':
      return { ...state, loading: false };
    case 'REGISTER_FAIL':
      return { ...state, error: action.error, loading: false };
    case 'ClEAR_ERROR':
      return { ...state, error: '' };
    case 'REGISTER_USER':
      return { ...state, loading: true, error: '' };
    case 'SET_IMAGE':
      return { ...state, driversLicense: action.payload };
    default:
      return state;
  }
};
