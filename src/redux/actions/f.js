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

const response = await fetch('https://api.sppx.io/rest/user/login', getState);
const json = await response.json();
if (response.status == '200') {
  // dispatch({ type: REGISTER_SUCCESS, payload: json });
  dispatch({ type: LOGIN_SUCCESSFUL, payload: json });
} else {
  // dispatch({ type: REGISTER_FAIL, status: response.status, payload: json });
  dispatch({
    type: LOGIN_FAILED,
    payload: response.status,
    responce: json,
  });
  alert(json);


  class Animal {
  constructor(dispatch, getState ) {
    this.dispatch = dispatch
    this.getState = getState
  }
 () {
  const newHeaders = new Headers();
  newHeaders.append('Content-Type', 'application/json');
  const newInit = {
    method: 'POST',
    headers: newHeaders,
    cache: 'no-cache',
  };
return newInit;
}

getInitWithToken() {
  return this.getInit().header.append('X-CSRF-Token', this.getState().auth.authToken);
}


  static beProud() {
    console.log('I AM AN ANIMAL')
  }

  printName() {
    console.log(this.name)
  }
}
