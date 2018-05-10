// @flow
import * as R from 'ramda';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  AUTH_TOKEN_RECEIVED,
  REGISTER_SEND,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './types';
import { ImagePicker } from 'expo';

export const registerThunk = () => async (dispatch: *, getState: *) => {
  // console.log('register thunk');

  const body = makeRegBody(getState().reg);
  dispatch({ type: 'REGISTER_USER', body });

  if (formIsComplete(dispatch, getState)) {
    //if (true) {
    const logHeaders = new Headers();
    logHeaders.append('Content-Type', 'application/json');
    //logHeaders.append('X-CSRF-Token', getState().auth.authToken);
    const logInit = {
      method: 'POST',
      headers: logHeaders,
      body: JSON.stringify(body),
      // body: createNewUserBodyState(),
      cache: 'no-cache',
    };
    // console.log(logInit.body);
    //const response = await fetch('https://api.sppx.io/rest/user/register', logInit);
    const response = await fetch('https://api.sppx.io/rest/profile/reg', logInit);
    const json = await response.json();
    if (response.status === 200) {
      dispatch({ type: REGISTER_SUCCESS, payload: json });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        //error: response,
        //payload: json,
      });
    }
  }
};

const makeRegBody = regForm => {
  return R.pick(
    ['name', 'email', 'firstName', 'lastName', 'initials', 'address', 'city', 'zip', 'password'],
    regForm
  );
};

export const clearError = () => ({ type: 'ClEAR_ERROR' });

const formIsComplete = (dispatch: *, getState: *) => {
  if (getState().reg.name === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter a username' });
    return false;
  } else if (getState().reg.email === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter an email' });
    return false;
  } else if (getState().reg.confEmail === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please confirm your email' });
    return false;
  } else if (getState().reg.email !== getState().reg.confEmail) {
    dispatch({
      type: REGISTER_FAIL,
      error: 'The email addreses you entered do not match',
    });
    return false;
  } else if (getState().reg.firstName === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter your first name' });
    return false;
  } else if (getState().reg.lastName === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter your last name' });
    return false;
  } else if (getState().reg.initials === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter your initials' });
    return false;
  } else if (getState().reg.address === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter your address' });
    return false;
  } else if (getState().reg.city === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter your city' });
    return false;
  } else if (getState().reg.zip === '') {
    dispatch({ type: REGISTER_FAIL, error: 'Please enter your zipcode' });
    return false;
  }
  return true;
};

// {
//   filename: 'myJanice.jpg',
//   file: image.file,
// },
export const takePicture = () => async (dispatch: *, getState: *) => {
  // const result = await ImagePicker.launchImageLibraryAsync({
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    base64: true,
  });

  if (!result.cancelled) {
    dispatch({ type: 'SET_IMAGE', payload: result });
  }
};

export const getPicture = () => async (dispatch: *, getState: *) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    base64: true,
  });

  if (!result.cancelled) {
    dispatch({ type: 'SET_IMAGE', payload: result });
  }
};

export const fileThunk = () => async (dispatch: *, getState: *) => {
  console.log('fileThunk');
  let filename = 'testFile2';
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'POST',
    headers: logHeaders,
    body: JSON.stringify({
      // filename: 'myfile.jpg',
      file: getState().reg.driversLicense.base64,
      // filepath: 'flippanthubris/investor/',
      filename: `${filename}.jpeg`,
      //filename: 'janice.jpg',
      // file: getState().reg.driversLicense.base64,
      //filepath: 'flippanthubris/investor/janice.jpg',
      filepath: `flippanthubris/investor/${filename}.jpeg`,
      //file: image.file,
    }),
  };
  // console.log(logInit.body);
  const response = await fetch('https://api.sppx.io/rest/file', logInit);
  const json = await response.json();
  if (response.status == 200) {
    dispatch({ type: REGISTER_SUCCESS, payload: json });
  } else {
    dispatch({
      type: REGISTER_FAIL,
      error: response.status.toString(),
      payload: json,
    });
  }
};

export const uploadAndSet = () => async (dispatch: *, getState: *) => {
  console.log('fileThunk');
  let filename = 'testFile2';
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'POST',
    headers: logHeaders,
    body: JSON.stringify({
      // filename: 'myfile.jpg',
      file: getState().reg.driversLicense.base64,
      // filepath: 'flippanthubris/investor/',
      filename: `${filename}.jpeg`,
      //filename: 'janice.jpg',
      // file: getState().reg.driversLicense.base64,
      //filepath: 'flippanthubris/investor/janice.jpg',
      filepath: `flippanthubris/investor/${filename}.jpeg`,
      //file: image.file,
    }),
  };
  // console.log(logInit.body);
  const response = await fetch('https://api.sppx.io/rest/file', logInit);
  const json = await response.json();
  if (response.status == 200) {
    dispatch({ type: REGISTER_SUCCESS, payload: json });
  } else {
    dispatch({
      type: REGISTER_FAIL,
      error: response.status.toString(),
      payload: json,
    });
  }
};

export const OldRegisterThunk = () => async (dispatch: *, getState: *) => {
  // console.log('register thunk');
  const body = createNewUserBodyFromObject(getState().reg);
  dispatch({ type: 'REGISTER_USER', body });
  let newBody = makeRegBody(getState().reg);
  dispatch({ type: 'REG_BODY', newBody });

  if (formIsComplete(dispatch, getState)) {
    //if (true) {
    const logHeaders = new Headers();
    logHeaders.append('Content-Type', 'application/json');
    logHeaders.append('X-CSRF-Token', getState().auth.authToken);
    const logInit = {
      method: 'POST',
      headers: logHeaders,
      body: createNewUserBodyFromObject(getState().reg),
      // body: createNewUserBodyState(),
      cache: 'no-cache',
    };
    // console.log(logInit.body);
    const response = await fetch('https://api.sppx.io/rest/user/register', logInit);
    const json = await response.json();
    if (response.status == 200) {
      dispatch({ type: REGISTER_SUCCESS, payload: json });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        error: response.status.toString(),
        payload: json,
      });
    }
  }
};

export const registerForm = {
  emailChanged: (text: string) => ({
    type: EMAIL_CHANGED,
    payload: text,
  }),
};

export const onChange = (type: string, payload: string) => ({
  type,
  payload,
});

const createNewUserBody = (username: string, email: string) =>
  JSON.stringify({
    name: username,
    // pass: password,
    // conf_pass: password,
    mail: `${email}@sppxtest.com`,
    conf_mail: `${email}@sppxtest.com`,
    profile_individual: {
      field_idv_address: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_city: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_name_first: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_name_last: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_zip: {
        und: {
          0: {
            value: '666',
          },
        },
      },
      field_idv_initials: {
        und: {
          0: {
            value: '666',
          },
        },
      },
    },
  });

const image = {
  filemime: 'image/jpeg',
  // filesize: 31912,
  file:
    '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',

  filename: 'imageJanice.jpg',
};

const createNewUserBodyState = () =>
  JSON.stringify({
    name: 'username',
    // pass: password,
    // conf_pass: password,
    mail: 'stateId@sppxtest.com',
    conf_mail: 'stateId@sppxtest.com',
    profile_individual: {
      field_idv_address: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_city: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_name_first: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_name_last: {
        und: {
          0: {
            value: 'theValue',
          },
        },
      },
      field_idv_zip: {
        und: {
          0: {
            value: '666',
          },
        },
      },
      field_idv_initials: {
        und: {
          0: {
            value: '666',
          },
        },
      },
      field_idv_id_state_number: {
        und: {
          0: {
            value: '555555',
          },
        },
      },
      field_idv_id_state: {
        und: {
          0: {
            //      upload: {
            filename: { value: 'myfile.jpeg' },
            data: { value: image.file },
            //      },
          },
        },
      },
    },
  });

const createNewUserBodyFromObject = (user: *) =>
  JSON.stringify({
    name: user.username,
    // pass: password,
    // conf_pass: password,
    // mail: `${user.email}@sppxtest.com`,
    // conf_mail: `${user.confEmail}@sppxtest.com`,
    mail: user.email,
    conf_mail: user.confEmail,
    profile_individual: {
      field_idv_address: {
        und: {
          0: {
            value: user.address,
          },
        },
      },
      field_idv_city: {
        und: {
          0: {
            value: user.city,
          },
        },
      },
      field_idv_name_first: {
        und: {
          0: {
            value: user.firstName,
          },
        },
      },
      field_idv_name_last: {
        und: {
          0: {
            value: user.lastName,
          },
        },
      },
      field_idv_zip: {
        und: {
          0: {
            value: user.zip,
          },
        },
      },
      field_idv_initials: {
        und: {
          0: {
            value: user.initials,
          },
        },
      },
    },
  });
