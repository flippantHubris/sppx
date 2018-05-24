// @flow

import * as R from 'ramda';
import { ImagePicker } from 'expo';

export const resetProfile = () => (dispatch: *, getState: *) => {
  const backup = R.clone(getState().profile.backup);
  dispatch({ type: 'RESET_PROFILE', payload: backup });
};

export const buttonPressed = button => ({
  type: `${button}_BUTTON_PRESSED`
});

export const editButtonPressed = () => ({
  type: 'EDIT_BUTTON_PRESSED'
});

export const cancelButtonPressed = () => ({
  type: 'CANCEL_BUTTON_PRESSED'
});

export const onProfileChange = (
  profileType: string,
  field: string,
  payload: string
) => ({
  type: 'PROFILE_FIELD_CHANGED',
  profileType,
  field,
  payload
});

export const myProfileChange = (profileType, field, payload) => ({
  type: 'PROFILE_FIELD_CHANGED',
  profileType,
  field,
  payload
});

export const onFieldChange = (
  section: string,
  field: string,
  payload: string
) => ({
  type: 'FIELD_CHANGED',
  section,
  field,
  payload
});

export const updateProfile = () => async (dispatch: *, getState: *) => {
  dispatch({ type: 'UPDATING_PROFILE' });
  const { auth } = getState();
  const { url, uid, authToken } = auth;

  const account = getState().profile.account;
  const individual = getState().profile.individual;
  const body = {
    account,
    individual
  };

  const bodyJson = JSON.stringify({
    profile: {
      account,
      individual
    }
  });
  dispatch({ type: 'PROFILE_UPDATE', bodyJson, stuff: 'asdasd' });

  console.log(getState().auth.authToken);
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'POST',
    headers: logHeaders,
    body: bodyJson,
    cache: 'no-cache'
  };

  // const response = await fetch('http://sppx.dd:8083/rest/profile/edit', logInit);
  const response = await fetch(getState().auth.url.profileEdit, logInit);
  const json = await response.json();
  if (response.status === 200) {
    dispatch({ type: 'PROFILE_UPDATE_SUCCESSFUL', payload: json });
  } else {
    dispatch({
      type: 'PROFILE_UPDATE_FAILED',
      status: response.status,
      json
    });
    resetProfile(dispatch, getState);
  }
};

// export const getUser = () => async (dispatch: *, getState: *) => {
//   dispatch({ type: 'USER_FETCH' });
//   const { auth } = getState();
//   const { url, uid, authToken } = auth;

//   console.log(authToken);
//   const logHeaders = new Headers();
//   logHeaders.append('Content-Type', 'application/json');
//   logHeaders.append('X-CSRF-Token', getState().auth.authToken);
//   const logInit = {
//     method: 'GET',
//     headers: logHeaders,
//     cache: 'no-cache',
//   };
//   console.log(`profile url ${url.profile}${uid}`);
//   const response = await fetch(`${url.profile}${uid}`, logInit);
//   const json = await response.json();
//   if (response.status === 200) {
//     dispatch({ type: 'USER_FETCH_SUCCESS', payload: json });
//   } else {
//     dispatch({
//       type: 'USER_FETCH_FAILED',
//       payload: response.status,
//       responce: json,
//     });
//     alert(json);
//   }
// };

export const getUser = () => async (dispatch, getState) => {
  dispatch({ type: 'USER_FETCH' });
  const { auth } = getState();
  const { url, uid, authToken } = auth;

  console.log(authToken);
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'GET',
    headers: logHeaders,
    cache: 'no-cache'
  };
  console.log(`profile url ${url.profile}${uid}`);
  const response = await fetch(`${url.profile}${uid}`, logInit);

  if (response.status === 200) {
    const json = await response.json();
    dispatch({ type: 'USER_FETCH_SUCCESS', payload: json });
  } else {
    dispatch({
      type: 'USER_FETCH_FAILED',
      response
    });
  }
};

export const toggle = field => ({
  type: 'TOGGLE',
  field
});

export const toggle2 = (field, object) => ({
  type: 'TOGGLE2',
  field,
  object
});

export const takePicture = () => async (dispatch: *, getState: *) => {
  // const result = await ImagePicker.launchImageLibraryAsync({
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    base64: true
  });

  if (!result.cancelled) {
    dispatch({ type: 'SET_IMAGE', payload: result });
  }
};

export const getPicture = () => async (dispatch: *, getState: *) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    base64: true
  });

  if (!result.cancelled) {
    dispatch({ type: 'SET_IMAGE', payload: result });
  }
};

// export const fileThunk = () => async (dispatch: *, getState: *) => {
//   console.log('fileThunk');
//   let filename = 'testFile2';
//   const logHeaders = new Headers();
//   logHeaders.append('Content-Type', 'application/json');
//   logHeaders.append('X-CSRF-Token', getState().auth.authToken);
//   const logInit = {
//     method: 'POST',
//     headers: logHeaders,
//     body: JSON.stringify({
//       // filename: 'myfile.jpg',
//       file: getState().reg.driversLicense.base64,
//       // filepath: 'flippanthubris/investor/',
//       filename: `${filename}.jpeg`,
//       //filename: 'janice.jpg',
//       // file: getState().reg.driversLicense.base64,
//       //filepath: 'flippanthubris/investor/janice.jpg',
//       filepath: `flippanthubris/investor/${filename}.jpeg`,
//       //file: image.file,
//     }),
//   };
//   // console.log(logInit.body);
//   const response = await fetch('https://api.sppx.io/rest/file', logInit);
//   const json = await response.json();
//   if (response.status == 200) {
//     dispatch({ type: REGISTER_SUCCESS, payload: json });
//   } else {
//     dispatch({
//       type: REGISTER_FAIL,
//       error: response.status.toString(),
//       payload: json,
//     });
//   }
// };

export const uploadAndSet = () => async (dispatch: *, getState: *) => {
  console.log('fileThunk');
  const filename = 'state';
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
      // filename: 'janice.jpg',
      // file: getState().reg.driversLicense.base64,
      // filepath: 'flippanthubris/investor/janice.jpg',
      filepath: `${getState().profile.account.name}/investor/${filename}.jpeg`
      // filepath: `flippanthubris/investor/${filename}.jpeg`,
      // file: image.file,
    })
  };
  dispatch({ type: 'UPLOAD', payload: logInit });
  // console.log(logInit.body);
  const response = await fetch('https://api.sppx.io/rest/file', logInit);
  const json = await response.json();
  if (response.status == 200) {
    dispatch({ type: 'UPLOAD_SUCCESS', payload: json });
    setStateFid()(dispatch, getState);
  } else {
    dispatch({
      type: 'UPLOAD_FAIL',
      error: response.status.toString(),
      payload: json
    });
  }
};

export const uploadPicture = () => async (dispatch: *, getState: *) => {
  console.log('fileThunk');
  const filename = 'state';
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
      // filename: 'janice.jpg',
      // file: getState().reg.driversLicense.base64,
      // filepath: 'flippanthubris/investor/janice.jpg',
      filepath: `${getState().profile.account.name}/investor/${filename}.jpeg`
      // filepath: `flippanthubris/investor/${filename}.jpeg`,
      // file: image.file,
    })
  };
  dispatch({ type: 'UPLOAD', payload: logInit });
  // console.log(logInit.body);
  const response = await fetch('https://api.sppx.io/rest/file', logInit);
  const json = await response.json();
  if (response.status == 200) {
    dispatch({ type: 'UPLOAD_SUCCESS', payload: json });
  } else {
    dispatch({
      type: 'UPLOAD_FAIL',
      error: response.status.toString(),
      payload: json
    });
  }
};

export const setStateFid = () => async (dispatch: *, getState: *) => {
  dispatch({ type: 'SETTING_STATE_FID', payload: json });
  const logHeaders = new Headers();
  logHeaders.append('Content-Type', 'application/json');
  logHeaders.append('X-CSRF-Token', getState().auth.authToken);
  const logInit = {
    method: 'POST',
    headers: logHeaders,
    body: JSON.stringify({
      fid: getState().profile.investor.stateIdFid,
      uid: getState().profile.account.uid
    })
  };
  // console.log(logInit.body);
  const response = await fetch('https://api.sppx.io/rest/profile/set', logInit);
  const json = await response.json();
  if (response.status == 200) {
    dispatch({ type: 'ID_SET_SUCCESS', payload: json });
  } else {
    dispatch({
      type: 'ID_SET_FAIL',
      error: response.status.toString(),
      payload: json
    });
  }
};

// export const uploadPicture = () => async (dispatch: *, getState: *) => {
//   console.log('fileThunk');
//   let filename = 'stateID';
//   const logHeaders = new Headers();
//   logHeaders.append('Content-Type', 'application/json');
//   logHeaders.append('X-CSRF-Token', getState().auth.authToken);
//   const logInit = {
//     method: 'POST',
//     headers: logHeaders,
//     body: JSON.stringify({
//       // filename: 'myfile.jpg',
//       file: getState().reg.driversLicense.base64,
//       // filepath: 'flippanthubris/investor/',
//       filename: `${filename}.jpeg`,
//       //filename: 'janice.jpg',
//       // file: getState().reg.driversLicense.base64,
//       //filepath: 'flippanthubris/investor/janice.jpg',
//       filepath: `flippanthubris/investor/${filename}.jpeg`,
//       //file: image.file,
//     }),
//   };
//   // console.log(logInit.body);
//   const response = await fetch('https://api.sppx.io/rest/file', logInit);
//   const json = await response.json();
//   if (response.status == 200) {
//     dispatch({ type: 'UPLOAD_SUCCESS', payload: json });
//   } else {
//     dispatch({
//       type: 'UPLOAD_FAIL',
//       error: response.status.toString(),
//       payload: json,
//     });
//   }
// };

// const postLogout = getState => {
export const postLogout = () => async (dispatch: *, getState: *) => {
  dispatch({ type: 'LOGOUT' });
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('X-CSRF-Token', getState().auth.authToken);
  const init = {
    method: 'POST',
    headers,
    cache: 'no-cache'
  };

  return fetch(getState().auth.url.logout, init);
};

export const profileActions = {
  uploadAndSet,
  postLogout,
  getUser,
  onFieldChange,
  onProfileChange,
  resetProfile,
  updateProfile,
  editButtonPressed,
  cancelButtonPressed,
  buttonPressed,
  toggle,
  toggle2,
  takePicture,
  getPicture,
  uploadPicture,
  setStateFid
};
