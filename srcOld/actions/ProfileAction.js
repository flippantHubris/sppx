// @flow
import * as R from 'ramda';

export const resetProfile = () => (dispatch: *, getState: *) => {
  const backup = R.clone(getState().profile.backup);
  dispatch({ type: 'RESET_PROFILE', payload: backup });
};

export const buttonPressed = button => ({
  type: `${button}_BUTTON_PRESSED`,
});

export const editButtonPressed = () => ({
  type: 'EDIT_BUTTON_PRESSED',
});

export const cancelButtonPressed = () => ({
  type: 'CANCEL_BUTTON_PRESSED',
});

export const onProfileChange = (profileType: string, field: string, payload: string) => ({
  type: 'PROFILE_FIELD_CHANGED',
  profileType,
  field,
  payload,
});

export const myProfileChange = (profileType, field, payload) => ({
  type: 'PROFILE_FIELD_CHANGED',
  profileType,
  field,
  payload,
});


export const onFieldChange = (section: string, field: string, payload: string) => ({
  type: 'FIELD_CHANGED',
  section,
  field,
  payload,
});

export const updateProfile = () => async (dispatch: *, getState: *) => {
  dispatch({ type: 'UPDATING_PROFILE' });
  const { auth } = getState();
  const { url, uid, authToken } = auth;

  const account = getState().profile.account;
  const individual = getState().profile.individual;
  const body = {
    account,
    individual,
  };

  const bodyJson = JSON.stringify({
    profile: {
      account,
      individual,
    },
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
    cache: 'no-cache',
  };

  //const response = await fetch('http://sppx.dd:8083/rest/profile/edit', logInit);
  const response = await fetch(getState().auth.url.profileEdit, logInit);
  const json = await response.json();
  if (response.status === 200) {
    dispatch({ type: 'PROFILE_UPDATE_SUCCESSFUL', payload: json });
  } else {
    dispatch({
      type: 'PROFILE_UPDATE_FAILED',
      status: response.status,
      json,
    });
    resetProfile(dispatch, getState);
  }
};

export const getUser = () => async (dispatch: *, getState: *) => {
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
    cache: 'no-cache',
  };
  console.log(`profile url ${url.profile}${uid}`);
  const response = await fetch(`${url.profile}${uid}`, logInit);
  const json = await response.json();
  if (response.status === 200) {
    dispatch({ type: 'USER_FETCH_SUCCESS', payload: json });
  } else {
    dispatch({
      type: 'USER_FETCH_FAILED',
      payload: response.status,
      response: json,
    });
    alert(json);
  }
};

export const toggle = field => ({
  type: `TOGGLE`,
  field,
});

export const profileActions = {
  getUser,
  onFieldChange,
  onProfileChange,
  resetProfile,
  updateProfile,
  editButtonPressed,
  cancelButtonPressed,
  buttonPressed,
  toggle,
};
